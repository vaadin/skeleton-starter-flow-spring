package org.vaadin.example;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class HelloEndpoint {

    GreetService service = new GreetService();

    @Nonnull
    public String sayHello(@Nonnull String name) {
        return service.greet(name);
    }
}
