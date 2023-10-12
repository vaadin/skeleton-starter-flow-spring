package org.vaadin.example;

import java.util.Arrays;
import java.util.Optional;

import jakarta.servlet.http.Cookie;

import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Secondary View")
@Route(value = "secondary")
public class SecondaryView extends VerticalLayout implements AfterNavigationObserver {

    Div cookieContainer = new Div();
    Div noPathCookieContainer = new Div();

    public SecondaryView() {
        setSpacing(false);

        var text = new Span("Current cookie value:");
        var noPathText = new Span("Current no path cookie value:");
        add(text, cookieContainer, noPathText, noPathCookieContainer);
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        var cookie = getCookieValue("SecondaryView");
        var noPathCookie = getCookieValue("SecondaryViewNoPath");
        cookieContainer.setText(cookie);
        noPathCookieContainer.setText(noPathCookie);
    }

    public String getCookieValue(String key) {
        Optional<UI> ui = this.getUI();
        if (ui.isPresent()) {
            Cookie[] cookies = (Cookie[]) ComponentUtil.getData(ui.get(), "cookies");
            if (cookies == null) {
                return null;
            }
            return Arrays.stream(cookies).filter(cookie -> key.equals(cookie.getName())).findFirst().map(
                    Cookie::getValue
            ).orElse(null);
        } else {
            return null;
        }
    }
}
