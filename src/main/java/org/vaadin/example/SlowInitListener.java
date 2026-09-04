package org.vaadin.example;

import java.time.Instant;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;

/**
 * Widens the window inside {@code VaadinService.init()} in which the bug is
 * reachable, so that it can be hit deterministically instead of by luck.
 * <p>
 * By the time service init listeners run, {@code createRequestHandlers()} has
 * already wired a live {@code PushHandler} into the Atmosphere {@code
 * /VAADIN/push} endpoint registered at ServletContext init, while
 * {@code VaadinService.initialized} is still {@code false} - it is only set at
 * the very end of {@code init()}. Sleeping here holds that window open.
 * <p>
 * Disabled by default. Enable with {@code -Drepro.initDelayMillis=10000}: the
 * browser retries push every 5s, so a 10s window is always hit, on every
 * restart, with no retrying.
 */
public class SlowInitListener implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
        long delay = Long.getLong("repro.initDelayMillis", 0L);
        if (delay <= 0) {
            return;
        }
        System.out.println("[repro] holding VaadinService.init() open for "
                + delay + " ms, from " + Instant.now()
                + " - push connects arriving now will throw");
        try {
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("[repro] window closed at " + Instant.now());
    }
}
