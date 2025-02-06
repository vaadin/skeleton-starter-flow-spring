package org.vaadin.example;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.react.ReactAdapterComponent;
import com.vaadin.flow.router.Route;

@Route("picker")
@JsModule("./picker.tsx")
@Tag("my-picker")
public class PickerComponent extends ReactAdapterComponent {
}


