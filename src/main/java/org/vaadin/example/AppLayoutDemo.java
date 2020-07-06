package org.vaadin.example;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;


@Route("appLayoutDemo")
@CssImport("./styles/layout-styles.css")
public class AppLayoutDemo extends AppLayout{


    public AppLayoutDemo() {
        Image image = new Image("https://dummyimage.com/1000x400/000/fff", "Vaadin logo");
        image.setHeight("44px");
        
        MenuBar menuBar = new MenuBar();
        menuBar.setOpenOnHover(true);
        menuBar.setClassName("margin-left-bar");
        Icon tableIcon = VaadinIcon.TABLE.create();
        HorizontalLayout tableVerticalLayout = new HorizontalLayout(tableIcon, new Span("xxx"));
        tableVerticalLayout.setSpacing(true);
        tableVerticalLayout.setPadding(true);
        menuBar.addItem(tableVerticalLayout);

        MenuItem tableItem = menuBar.addItem("列表页");
        
        SubMenu tableSubMenu = tableItem.getSubMenu();
        MenuItem tableTypeItem = tableSubMenu.addItem("列表类型");

        SubMenu tableTypeSubMenu = tableTypeItem.getSubMenu();
        MenuItem acrticleItem = tableTypeSubMenu.addItem("文章列表");
        acrticleItem.addClickListener(e -> {
            //setContent(new Div(new H1("文章列表")));
            setContent(new GridViewDemo(new EmployeeEditor()));
        });
        MenuItem cardTable = tableTypeSubMenu.addItem("卡片列表");
        cardTable.addClickListener(e -> {
            setContent(new Div(new H1("卡片列表")));
            
        });
        addToNavbar(image, menuBar);

        //addToDrawer(new Div(new Span("xxx")));
    }
    
}