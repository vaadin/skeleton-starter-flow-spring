package org.vaadin.example;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("some/path")
@CssImport("./styles/layout-styles.css")
public class Hello extends Div{

    public Hello() {
        //setText("hello @Route!");
        setClassName("card");
        Div head = new Div();
        head.setClassName("header");
        H1 h1 = new H1("1");
        head.add(h1);
        Div container = new Div();
        container.setClassName("container");
        Span title = new Span("January 1, 2016");
        container.add(title);
        add(head, container);
    }
    
    
}