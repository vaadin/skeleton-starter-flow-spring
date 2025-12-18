package org.vaadin.example;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.server.auth.AccessCheckResult;
import com.vaadin.flow.server.auth.DefaultAccessCheckDecisionResolver;
import com.vaadin.flow.server.auth.NavigationAccessControl;

@Service
public class NACInstaller implements VaadinServiceInitListener {
    @Override
    public void serviceInit(ServiceInitEvent serviceInitEvent) {
        serviceInitEvent.getSource().addUIInitListener(uiEvent -> {
            NavigationAccessControl nac = new NavigationAccessControl(
                    List.of(navigationContext ->
                            navigationContext.getLocation().getQueryParameters()
                                    .getSingleParameter("error")
                                    .filter(error -> error.equals("401"))
                                    .map(unused -> AccessCheckResult.deny("Go away!"))
                                    .orElse(AccessCheckResult.allow())), new DefaultAccessCheckDecisionResolver());
            uiEvent.getUI().addBeforeEnterListener(nac);
        });
    }
}
