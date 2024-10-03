package org.vaadin.example;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.Route;

@Menu(title = "Hello World View")
@Route("")
public class HelloWorldView extends VerticalLayout {

    public HelloWorldView() {
        add(new TextField("Enter your name:"), new Button("Say hello"));
    }
}
