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

## 1. Deterministic, with a browser (recommended for debugging)

`SlowInitListener` holds the window open on demand. Start the app with:

    -Drepro.initDelayMillis=10000

Then:

1. Open http://localhost:8080/ and wait for the view to render (*Online*).
2. Leave the tab open.
3. Restart the server, with the flag set.
4. The exception is in the log, every time.

The browser retries push every 5 s, so a 10 s window is always hit — no
restarting until you get lucky, and you get 10 s of held-open window to attach a
debugger to. Verified 4/4 restarts with a single tab and arbitrary restart
timing (3, 4, 5, 6 s pauses).

The same knob should make a deterministic regression test possible — see
`PushHandlerTest.onConnect_websocketTransport_requestStartIsCalledOnServiceInstance`
in flow-server for the existing mocking pattern (a `MockVaadinServletService`
whose `init()` has not been called, asserting `onConnect` does not throw).

## 2. Deterministic, headless

    repro/run.sh                # reports occurrences per startup
    repro/run.sh mytag 10000    # optional tag and init delay

`probe.js` plays the stale tab, reconnecting every 20 ms instead of every 5 s, so
it always lands in the window even without a delay. Needs Node 22+ (built-in
`WebSocket`). 3 occurrences on every run.

## 3. As it happens in the wild (racy)

Without `repro.initDelayMillis`, with a tab left open: stop the server, wait
~2 s, start it again. Repeat if nothing happens.

Measured with Chrome DevTools (`Network.webSocketCreated`) on the open tab:

- The client retries `/VAADIN/push` every **5 s, indefinitely, no backoff
  growth**. A tab left open for minutes is still knocking, which is why a tab
  from an earlier server on the same port reproduces this long afterwards.
- The natural window is ~370 ms, so an arbitrarily timed restart hits about 1 in
  14 times.
- The stop→start pause is what matters: retries fall at `T_stop + 5s*k` and the
  window opens ~3.2 s after launch, so a ~2 s pause lines them up. Measured:
  **3/5** restarts with a ~2 s pause, **1/8** with a ~4 s pause.
- Extra tabs do not raise the odds much (all tabs disconnect together, so their
  timers stay in phase) but make a hit obvious: 10 tabs logged the exception 24
  times on one restart.

Opening a browser *after* startup never reproduces it — the client has to be
already retrying while the server boots.

## Versions

| Setup | window (push endpoint live -> init() done) | exception |
|---|---|---|
| 25.2.6 | ~20 ms | 0/3 runs |
| 25.3.0-beta1 | ~360 ms | 3/3 runs |
| Flow 25.3-SNAPSHOT (main, locally built) + platform 25.3-SNAPSHOT | ~370 ms | 3/3 runs |
| same, Copilot removed from classpath | ~0 ms | 0/3 runs |

The race is **not new** — 25.2.6 throws the identical stack with
`-Drepro.initDelayMillis=8000`. What changed in 25.3 is the window width.
Sampling `restartedMain` during the window:

    com.vaadin.copilot.shaded.classgraph.ClassGraph.scan(ClassGraph.java:1609)
    com.vaadin.copilot.CopilotDebugViewRegistrar.registerDebugViews(CopilotDebugViewRegistrar.java:58)
    com.vaadin.copilot.CopilotIndexHtmlLoader.serviceInit(CopilotIndexHtmlLoader.java:51)
    com.vaadin.flow.server.VaadinService.lambda$init$0(VaadinService.java:284)

`CopilotDebugViewRegistrar` is new in 25.3: absent from `copilot-25.2.5.jar` and
`copilot-25.3-20260729` (32 MB), present from `copilot-25.3-20260830` onwards
and in `25.3.0-beta1` (49 MB). Copilot is the amplifier, not the defect — it
stretches a pre-existing window ~20x.

`pom.xml` is on `25.3-SNAPSHOT` via `vaadin-prereleases`, so a locally built Flow
is picked up automatically; set `vaadin.version` to `25.3.0-beta1` for a pinned
run or `25.2.6` to compare.
