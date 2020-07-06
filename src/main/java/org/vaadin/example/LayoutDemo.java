package org.vaadin.example;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("layoutDemo")
@CssImport("./styles/layout-styles.css")
public class LayoutDemo extends VerticalLayout{

    public LayoutDemo() {

        HorizontalLayout navigationBar = new HorizontalLayout();
        navigationBar.setWidthFull();

        H1 h1 = new H1("demo");
        navigationBar.add(h1);
        navigationBar.setClassName("card");
        navigationBar.setSpacing(false);
        TextField contTextField = new TextField("contextLayout");
        HorizontalLayout contextLayout = new HorizontalLayout(contTextField);
        HorizontalLayout footBar = new HorizontalLayout();
        add(initNavigationBar(), contextLayout, footBar);
        initLayout();
    }

    private void initLayout() {
        //false表示不设置margin
        setSpacing(false);
        //false表示不设置padding
        setPadding(false);
    }

    private HorizontalLayout initNavigationBar() {
        HorizontalLayout navigationBar = new HorizontalLayout();
        Icon logo = VaadinIcon.VAADIN_H.create();
        logo.setSize("32px");
        navigationBar.add(logo);

        Icon tableIcon = VaadinIcon.TABLE.create();
        tableIcon.setSize("32px");
        tableIcon.setClassName("navigationIcon");
        navigationBar.add(tableIcon);

        navigationBar.setClassName("card");
        navigationBar.setSpacing(false);
        return navigationBar;
    }
    
}