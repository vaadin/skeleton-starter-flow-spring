# Repro: "Can not process requests before init() has been called" (push)

## The race

`JSR356WebsocketInitializer` pre-initializes Atmosphere and registers the
`/VAADIN/push` websocket endpoint during **ServletContext** initialization.
Spring Boot's `TomcatWebServer.start()` then opens the HTTP connector
(`addPreviouslyRemovedConnectors()`) **before** running the deferred
`load-on-startup` servlet init (`performDeferredLoadOnStartup()`), which is what
triggers `VaadinService.init()`.

Inside `VaadinService.init()`, `createRequestHandlers()` builds
`PushRequestHandler`, which wires a live `PushHandler` into that already
listening Atmosphere endpoint (debug line: "Using pre-initialized Atmosphere for
servlet springServlet"). `initialized = true` is only set at the very end of
`init()`.

Everything in between is a window where the push endpoint accepts websockets and
dispatches them into a `PushHandler` whose service is not initialized:

    PushHandler.onConnect -> callWithUi -> service.requestStart
      -> IllegalStateException: Can not process requests before init() has been called

Any client reconnecting its push channel in that window hits it — e.g. a browser
tab left open from a previous server on the same port.

## What changed in 25.3

The race itself is **not new** — 25.2.6 throws the identical stack once the
window is widened artificially (a `VaadinServiceInitListener` that sleeps a few
seconds). What changed is the window width:

| Setup | window (push endpoint live -> init() done) | exception |
|---|---|---|
| 25.2.6 | ~20 ms | 0/3 runs |
| 25.3.0-beta1 | ~360 ms | 3/3 runs |
| Flow 25.3-SNAPSHOT (main, locally built) + platform 25.3-SNAPSHOT | ~370 ms | 3/3 runs |
| same, Copilot removed from classpath | ~0 ms | 0/3 runs |

Thread sampling of `restartedMain` during the window points at Copilot, running
as a service init listener inside `VaadinService.init()`:

    com.vaadin.copilot.shaded.classgraph.ClassGraph.scan(ClassGraph.java:1609)
    com.vaadin.copilot.CopilotDebugViewRegistrar.registerDebugViews(CopilotDebugViewRegistrar.java:58)
    com.vaadin.copilot.CopilotIndexHtmlLoader.serviceInit(CopilotIndexHtmlLoader.java:51)
    com.vaadin.flow.server.VaadinService.lambda$init$0(VaadinService.java:284)

`CopilotDebugViewRegistrar` is new in 25.3: absent from `copilot-25.2.5.jar` and
from `copilot-25.3-20260729` (32 MB), present from `copilot-25.3-20260830`
onwards and in `25.3.0-beta1` (49 MB). Dropping the copilot jar from the
classpath makes the exception disappear and moves the first accepted websocket
back to *after* `init()` completes, exactly like 25.2.6.

So Copilot's ClassGraph scan does not cause the bug, it just stretches a
pre-existing window by ~20x, which is enough to lose the race every time.

## Manual reproduction with a browser

1. Start the app, open http://localhost:8080/, wait for the view to render (indicator shows *Online*).
2. Leave the tab open.
3. Stop the server, wait ~2 s, start it again.
4. The exception appears in the new server's log, just before `Tomcat started on port 8080`.

Repeat step 3 if nothing happens — it is a race.

Measured with Chrome DevTools (`Network.webSocketCreated`) on the open tab:

- The client retries `/VAADIN/push` every **5 s, indefinitely, no backoff growth**. A tab left
  open for minutes is still knocking, which is why a tab from an earlier server on the same
  port reproduces this long afterwards.
- Window is ~370 ms, so an arbitrarily timed restart hits about 1 in 14 times.
- The stop→start pause is what matters: retries fall at `T_stop + 5s*k` and the window opens
  ~3.2 s after launch, so a ~2 s pause lines them up. Measured: **3/5** restarts with a ~2 s
  pause, **1/8** with a ~4 s pause.
- Extra tabs do not raise the odds much (all tabs disconnect together, so their timers stay in
  phase) but make a hit obvious: 10 tabs logged the exception 24 times on one restart.

## Reproducing (deterministic)

    repro/run.sh

`probe.js` plays the stale tab: it reconnects to `/VAADIN/push` every 20 ms until
the new server accepts it. Requires `@Push` on the app shell (see
`Application.java`) and Node 22+ for the built-in `WebSocket` client.

`pom.xml` is currently on `25.3-SNAPSHOT` with the `vaadin-prereleases`
repository added; set `vaadin.version` to `25.3.0-beta1` or `25.2.6` to compare.
For the SNAPSHOT run, Flow itself was built from the local checkout:

    cd /home/marco/projects/vaadin/flow/flow_develop
    mvn install -DskipTests -pl vaadin-spring,vaadin-dev-server,flow-push,flow-devloop-daemon -am
