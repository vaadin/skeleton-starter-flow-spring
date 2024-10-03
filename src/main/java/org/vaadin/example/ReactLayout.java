package org.vaadin.example;

import java.util.Objects;

import com.vaadin.flow.component.HasElement;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.react.ReactAdapterComponent;
import com.vaadin.flow.router.Layout;
import com.vaadin.flow.router.RouterLayout;

@NpmPackage(value = "@mui/material", version = "6.1.2")
@NpmPackage(value = "@emotion/react", version = "11.13.3")
@NpmPackage(value = "@emotion/styled", version = "11.13.0")
@NpmPackage(value = "@mui/icons-material", version = "6.1.2")
@Layout
@JsModule("./views/ReactLayout.tsx")
@Tag("react-layout")
public class ReactLayout extends ReactAdapterComponent
        implements RouterLayout {

    @Override
    public void showRouterLayoutContent(HasElement content) {
        if (content != null) {
            // Bind the flow element to the 'flowContent' element
            // on the client
            getContentElement("flowContent")
                    .appendChild(Objects.requireNonNull(
                            content.getElement()));
        }
    }
}
