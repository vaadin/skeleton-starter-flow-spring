package org.vaadin.example;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.VaadinResponse;

@PageTitle("About")
@Route("")
public class AboutView extends VerticalLayout {

    public AboutView() {
        add(new Paragraph("View to setup a cookie and redirect to secondary page"));

        var button = new Button("Secondary view");
        button.addClickListener(event -> moveToSecondaryView());
        add(button);
    }

    private void moveToSecondaryView() {
        addCookie((HttpServletResponse) VaadinResponse.getCurrent(), "SecondaryView",
                DateTimeFormatter.ofPattern("yyyy-MM-dd'x'HH:mm:ss").format(LocalDateTime.now()), "/secondary");
        addCookie((HttpServletResponse) VaadinResponse.getCurrent(), "SecondaryViewNoPath",
                DateTimeFormatter.ofPattern("yyyy-MM-dd'x'HH:mm:ss").format(LocalDateTime.now()), null);
        UI.getCurrent().getPage().setLocation("/secondary");
    }

    public static void addCookie(HttpServletResponse response, String key, String value, String path) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(-1); // deleted on browser exit
        cookie.setPath(path);
        cookie.setSecure(true);
        response.addCookie(cookie);
    }
}
