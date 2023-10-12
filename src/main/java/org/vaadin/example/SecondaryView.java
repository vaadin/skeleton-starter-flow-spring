package org.vaadin.example;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinRequest;

@PageTitle("Secondary View")
@Route(value = "secondary")
public class SecondaryView extends VerticalLayout implements AfterNavigationObserver {

    Div cookieContainer = new Div();
    Div noPathCookieContainer = new Div();
    Div pathInfoContainer = new Div();

    public SecondaryView() {
        setSpacing(false);

        var text = new Span("Current cookie value:");
        var noPathText = new Span("Current no path cookie value:");
        var pathInfo = new Span("Path Info:");
        add(text, cookieContainer, noPathText, noPathCookieContainer, pathInfo, pathInfoContainer);
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        var cookie = getCookieValue("SecondaryView");
        var noPathCookie = getCookieValue("SecondaryViewNoPath");
        System.out.println("SecondaryView cookie: " + cookie + ", SecondaryViewNoPath:"+ noPathCookie);
        cookieContainer.setText(cookie);
        noPathCookieContainer.setText(noPathCookie);
        pathInfoContainer.setText(VaadinRequest.getCurrent().getPathInfo());
    }

    public static String getCookieValue(String key) {
        var request = (HttpServletRequest) VaadinRequest.getCurrent();

        return Optional.ofNullable(request.getCookies()).stream().flatMap(Stream::of)
                .filter(cookie -> key.equals(cookie.getName()))
                .findFirst().map(Cookie::getValue).orElse(null);
    }
}
