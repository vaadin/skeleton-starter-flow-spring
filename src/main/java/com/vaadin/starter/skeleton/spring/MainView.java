package com.vaadin.starter.skeleton.spring;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.PWA;

@Route
@PWA(name = "Vaadin App", shortName = "Vaadin App")
public class MainView extends VerticalLayout {

    public MainView(@Autowired MessageService service) {
        Button button = new Button("Click me",
                e -> Notification.show(service.getMessage()));
        add(button);
    }

}
