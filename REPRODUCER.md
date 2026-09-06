# Repro: Vaadin 25 — PWA `offline.html` not displayed after integrating Spring Security

Forum thread: <https://vaadin.com/forum/t/vaadin-25-pwa-offline-html-not-displaying-after-integrating-spring-security/179756>

Reproduced on the skeleton starter with the reporter's `SecurityConfig` copied
verbatim from post #1. Vaadin **25.2.6**, Spring Boot 4.1.0, Java 25, Chromium 152,
driven with Playwright.

## Setup in this repo

- `spring-boot-starter-security` in `pom.xml`
- `SecurityConfig` — verbatim from the forum post (no `loginView`, the same
  `permitAll` list, the same `WebSecurityCustomizer` ignore list)
- `MainView` is `@AnonymousAllowed` (post #5: all views are open)
- `@PWA(..., offlinePath = "offline.html")` on `Application`
- `src/main/resources/META-INF/resources/offline.html`

Run it: `./mvnw -DskipTests package && java -jar target/spring-skeleton-1.0-SNAPSHOT.jar`
then load the app, wait for the service worker, and switch DevTools to Offline.

## Result

Reproduced. The offline page renders **blank** with Spring Security on the
classpath, and correctly without it. The single new console message is:

    Refused to display 'http://localhost:8081/' in a frame
    because it set 'X-Frame-Options' to 'deny'.

## Root cause: two Vaadin defects that only break in combination

### Defect 1 — `@PWA(offlinePath = …)` does not invalidate the reusable default bundle

`OFFLINE_PATH` is a Vite `define` baked in at frontend-build time
(`vite.generated.ts` → `OFFLINE_PATH: settings.offlinePath`, written by
`TaskUpdateSettingsFile`). But `BundleValidationUtil.needsBuildInternal()` checks
npm packages, index.html, theme config, frontend imports and exported web
components — **it never looks at the PWA configuration**.

A plain skeleton app has no custom frontend dependencies, so Vaadin reuses the
pre-compiled bundle from `vaadin-prod-bundle` / `vaadin-dev-bundle`, whose `sw.js`
was compiled with `OFFLINE_PATH = "."`:

    $ ./mvnw package                                  # "A production mode bundle build is not needed"
    $ grep -o 'var Y=`[^`]*`' target/classes/META-INF/VAADIN/webapp/sw.js
    var Y=`.`                                         # should be `offline.html`

    $ ./mvnw -Dvaadin.force.production.build=true package
    var Y=`offline.html`                              # correct

`target/vaadin-dev-server-settings.json` correctly holds
`"offlinePath": "'offline.html'"` — only the compiled bundle is stale. Dev mode is
affected too (`GET /sw.js` serves `offlinePath = "."`).

Consequence: `matchPrecache(".")` in `sw.ts` resolves to the precached **app
shell** rather than to `offline.html`. The offline page is correctly precached and
never served directly. The app shell boots from cache instead, Flow detects the
lost connection, and `Flow.offlineStubAction()` (flow-client `Flow.js`) renders the
offline content in an iframe:

    const offlineStub = document.createElement('iframe');
    offlineStub.setAttribute('src', './offline-stub.html');

`offline-stub.html` is served by `PwaHandler` with the same body as `offline.html`,
so **without** Spring Security the user still sees their offline page and nothing
looks wrong. Defect 1 on its own is latent.

### Defect 2 — Spring Security's `X-Frame-Options: DENY` blocks Vaadin's own offline stub iframe

`/offline-stub.html` is served through the Vaadin servlet, so it passes through the
Spring Security filter chain and gets the default `X-Frame-Options: DENY`. Being
`permitAll` does not help — the header is added to permitted responses too. Workbox
stores the response *with its headers* in the precache, so the browser refuses to
render it in the iframe, the frame becomes `chrome-error://chromewebdata/`, and the
offline page is blank.

Cached response headers, read out of the workbox cache in the browser:

| entry | status | `X-Frame-Options` |
|---|---|---|
| `/` | 200 | `DENY` |
| `/offline-stub.html` | 200 | **`DENY`** ← blocks the iframe |
| `/offline.html` | 200 | *(none)* — the reporter's `WebSecurityCustomizer` ignores this path |

`VaadinSecurityConfigurer` never touches `HeadersConfigurer`/`frameOptions`
(`grep -r frameOptions vaadin-spring` → no hits), even though the Vaadin client
frames this Vaadin-internal path itself. The reporter did whitelist `/offline.html`;
they had no way to know `/offline-stub.html` is the path that actually gets framed.

### Why "it broke when I added Spring Security"

Defect 1 forces the offline page through the iframe route; Defect 2 breaks that
route. Either one alone is survivable — together they produce the reported symptom.

## Verification — each fix alone restores the offline page

| # | Change | `OFFLINE_PATH` | Offline result |
|---|---|---|---|
| baseline | security removed entirely | `.` | ✅ offline.html shown in stub iframe |
| **repro** | reporter's config verbatim | `.` | ❌ blank, `X-Frame-Options` error |
| fix A | `-Dvaadin.force.production.build=true`, config untouched | `offline.html` | ✅ offline.html served directly, no iframe |
| fix B | `http.headers(h -> h.frameOptions(fo -> fo.sameOrigin()))`, stale bundle | `.` | ✅ offline.html shown in stub iframe |

Fix B is in `SecurityConfig`, commented out. `SAMEORIGIN` still blocks cross-origin
framing, so it is a safe workaround; adding `/offline-stub.html` to the existing
`WebSecurityCustomizer` ignore list works as well.

## Notes on the forum answers

- The guess in post #2 (no login view → `403` on `/` → precache install aborts) is
  **not** what happens here: `MainView` is `@AnonymousAllowed`, so `GET /` returns
  `200`, the service worker installs cleanly, and all 34 precache entries —
  including `/` — are stored. Adding `configurer.loginView(...)` does not change the
  outcome.
- The failing resources the reporter listed *are* consequences, not the cause, as
  post #2 said — but note `/lumo/lumo.css`, `/styles.css` and
  `/VAADIN/static/push/vaadinPush.js` are absent from the precache in the **working**
  no-security baseline too. They are lazily-loaded and simply not precached, so
  those `ERR_INTERNET_DISCONNECTED` messages are benign and appear either way.

## Appendix — a separate, related bug found while investigating

Not what the reporter hit (they use the default filename), but verified on the same
setup: a **custom** offline path is never permitted by Spring Security.
`HandlerHelper` hardcodes the default into the public-resource list that
`VaadinSecurityConfigurer` turns into `permitAll` matchers:

    resources.add("/" + PwaConfiguration.DEFAULT_OFFLINE_PATH);   // always "/offline.html"

With `@PWA(offlinePath = "custom-offline.html")`, `/custom-offline.html` returns
`302 → /login` anonymously and `403` when authenticated. Both wreck the service
worker: authenticated, the precache fetch `403`s and workbox raises
`bad-precaching-response`, so install fails and the worker goes `redundant`;
anonymous, the `302` is followed and workbox's
`copyRedirectedCacheableResponsesPlugin` caches the **login page** under the offline
path. The same applies to custom `offlineResources` entries. Vaadin already solved
exactly this for the icon path (`WebIconsRequestMatcher` /
`RequestUtil.isCustomWebIcon()`, wired into `defaultPermitMatcher()`); there is no
equivalent for the offline path.
