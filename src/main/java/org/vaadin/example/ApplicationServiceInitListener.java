package org.vaadin.example;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.flow.server.VaadinServiceInitListener;

@Component
public class ApplicationServiceInitListener
        implements VaadinServiceInitListener {

    @Override
    public void serviceInit(ServiceInitEvent event) {
       event.getSource().addUIInitListener(uiInitEvent -> {
           VaadinRequest request = VaadinRequest.getCurrent();
           if (request != null) {
               Cookie[] cookies = request.getCookies();
               if (cookies != null) {
                   ComponentUtil.setData(uiInitEvent.getUI(), "cookies", cookies);
               }
           }
        });
    }
}
