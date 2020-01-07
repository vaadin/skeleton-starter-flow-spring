package com.vaadin.starter.skeleton.spring;

import java.io.Serializable;

import org.springframework.stereotype.Service;

@Service
public class GreetService implements Serializable {

    public String greet(String name) {
        return "Hello " + (name != null && !"".equals(name)? name : "anonymous user");
    }

}
