package com.vaadin.starter.skeleton.spring;

import java.io.Serializable;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

@Service
public class MessageService implements Serializable {

    public String getMessage() {
        return "Button was clicked at " + LocalTime.now();
    }
}
