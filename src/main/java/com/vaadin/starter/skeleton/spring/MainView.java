/*
 * Copyright 2000-2017 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.starter.skeleton.spring;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.page.BodySize;
import com.vaadin.flow.router.Route;

/**
 * The main view contains a simple label element and a template element.
 */
@BodySize(height = "100vh", width = "100vw")
@StyleSheet("context://styles.css")
@Route("")
public class MainView extends Composite<Div> {

    public MainView(@Autowired ExampleTemplate template) {
        // This is just a simple label created via Elements API
        Label label = new Label("Hello");
        getContent().add(label);
        // This is a simple template example
        getContent().add(template);
    }

}
