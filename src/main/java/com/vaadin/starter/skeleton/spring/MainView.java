package com.vaadin.starter.skeleton.spring;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.notification.Notification;
import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.PWA;

/** A sample Vaadin view class.
 *
 *  To implement a Vaadin view just extend any Vaadin component and
 *  use @Route annotation to announce it in a URL as a Spring managed bean.
 *  Use the @PWA annotation make the application installable on mobile
 *  phone or desktop.
 *  New instance of this class is created for every new user.
 */
@Route
@PWA(name = "Vaadin Application",
        shortName = "Vaadin App",
        description = "This is an example Vaadin application.",
        enableInstallPrompt = true)
@CssImport("./styles/shared-styles.css")
public class MainView extends VerticalLayout {

    /** Construct new Vaadin view.
     *
     * Build the initial UI state for the user accessing the application.
     *
     * @param service The message service. Automatically injected Spring managed bean.
     */
    public MainView(@Autowired MessageService service) {
        Button button = new Button("Click me",
                e -> Notification.show(service.getMessage()));
        button.setClassName("my-style");
        add(button);
    }

}
