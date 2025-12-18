package org.vaadin.example;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;

@Route
public class MainView extends VerticalLayout implements BeforeEnterObserver {

    public MainView() {
        add(new Div("Main View"));
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        if (beforeEnterEvent.getLocation().getQueryParameters().getSingleParameter("error")
                .orElse("").equals("500")
        ) {
            beforeEnterEvent.rerouteToError(MyException.class);
        }
    }
}
