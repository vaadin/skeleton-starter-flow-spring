# Repro: a custom `@PWA(offlinePath = …)` is never permitted by Spring Security

Companion to branch `repro/vaadin-25-pwa-offline-spring-security`, which reproduces the
forum report
<https://vaadin.com/forum/t/vaadin-25-pwa-offline-html-not-displaying-after-integrating-spring-security/179756>.
That reporter uses the default filename; **this branch shows a separate defect that
appears as soon as the offline path is renamed.**

Verified on Vaadin **25.2.6**, Spring Boot 4.1.0, Java 25, Chromium 152 (Playwright).

## Difference from the companion branch

```java
@PWA(name = "…", shortName = "…", offlinePath = "custom-offline.html")
```

plus `src/main/resources/META-INF/resources/custom-offline.html`. Everything else —
`SecurityConfig` (copied verbatim from the forum report), `@AnonymousAllowed` views —
is unchanged. `offline.html` is kept as a control; see below.

## Result

The service worker never installs, and the app has no offline support at all.

```bash
./mvnw -DskipTests package
java -jar target/spring-skeleton-1.0-SNAPSHOT.jar
```

Flow puts the configured path into the service worker's precache manifest:

```
$ curl -s http://localhost:8080/sw-runtime-resources-precache.js
self.additionalManifestEntries = [
{ url: 'icons/icon-144x144.png', revision: '644831840' },
…
{ url: 'custom-offline.html', revision: '-1756531766' },
{ url: 'offline-stub.html', revision: '-1756531766' },
{ url: 'manifest.webmanifest', revision: '1409500091' }
];
```

…and Spring Security blocks that exact URL:

| path | anonymous |
|---|---|
| `/` | 200 |
| `/offline-stub.html` | 200 |
| `/offline.html` — **not** the configured path, but hardcoded in Vaadin's permit list | 200 |
| `/custom-offline.html` — **the configured path** | **403** |

That asymmetry is the whole bug in one table.

In the browser: open <http://localhost:8080/>, and the service worker never activates.
Registering it by hand shows the install failing —

```js
const reg = await navigator.serviceWorker.register('/sw.js');
// the installing worker transitions to "redundant":
// workbox raises bad-precaching-response for the 403
```

Cache Storage is left partial (31 entries — the ones workbox fetched before aborting;
`custom-offline.html`, `offline-stub.html` and `manifest.webmanifest` are all absent).
DevTools → Network → Offline, then reload, gives the browser's network-error page.

## Root cause

`HandlerHelper` hardcodes the *default* offline path into the public-resource list that
`VaadinSecurityConfigurer.getDefaultWebSecurityIgnoreMatcher()` turns into `permitAll`
matchers, so the configured value is never consulted:

```java
// flow-server, com/vaadin/flow/server/HandlerHelper.java
resources.add("/" + PwaConfiguration.DEFAULT_OFFLINE_PATH);   // always "/offline.html"
```

Custom `offlineResources` entries are affected the same way unless they happen to fall
under an already-permitted prefix (`/themes/`, `/assets/`, `/VAADIN/`).

Vaadin already solved exactly this for the **icon** path, via `WebIconsRequestMatcher` /
`RequestUtil.isCustomWebIcon()` wired into `VaadinSecurityConfigurer.defaultPermitMatcher()`.
There is no equivalent for the offline path.

## Second failure mode: the login page gets cached as the offline page

This branch configures no login view, so the blocked request is answered with `403`.
If the application *does* configure one (`configurer.loginView(LoginView.class)` — the
documented setup, and the commented-out line in `SecurityConfig`), the same request is
answered with `302 → /login` instead. Workbox follows the redirect, the login page comes
back `200 text/html`, and `copyRedirectedCacheableResponsesPlugin` copies and caches it
under the precache key for the offline path.

The install then *succeeds*, and offline the service worker serves the Vaadin login
page, which cannot bootstrap without a network — a blank page rather than the offline
HTML. Reading the cache back shows `/custom-offline.html` holding the app shell while
`/offline-stub.html` holds the correct custom offline HTML.

## Workaround

Present but commented out in `SecurityConfig`:

```java
http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/custom-offline.html").permitAll());
```

That fixes *this* defect: `/custom-offline.html` returns `200`, the service worker
installs and activates, and the precache holds all 34 entries including
`/custom-offline.html` with the real offline HTML.

**It is not enough to see the offline page on this branch**, because the two companion
defects then take over: `sw.js` still carries `OFFLINE_PATH = "."`, so the app shell is
served instead and the offline content is pushed into the `offline-stub.html` iframe,
which Spring Security's `X-Frame-Options: DENY` blocks. Adding either companion fix on
top makes the page appear:

| variant | `OFFLINE_PATH` | `/custom-offline.html` | offline result |
|---|---|---|---|
| branch as-is | `.` | 403 | ❌ service worker never installs |
| `permitAll` workaround only | `.` | 200 | ❌ installs, but page still blank |
| `permitAll` + `-Dvaadin.force.production.build=true` | `custom-offline.html` | 200 | ✅ "CUSTOM OFFLINE PAGE custom-offline.html" served directly |

All three rows verified on a clean clone of this branch.

## Related

Branch `repro/vaadin-25-pwa-offline-spring-security` covers the two defects behind the
forum report itself:

1. `@PWA(offlinePath = …)` does not invalidate the reusable default bundle, so `sw.js`
   keeps `OFFLINE_PATH = "."`.
2. `/offline-stub.html` gets Spring Security's default `X-Frame-Options: DENY`, which
   blocks the iframe Flow uses to display the offline page.
