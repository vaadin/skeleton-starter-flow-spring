package org.vaadin.example;

import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Route("login")
@AnonymousAllowed
public class LoginView extends VerticalLayout {
    public LoginView() {
        LoginForm login = new LoginForm();
        login.setAction("login");
        add(login);
    }
}
