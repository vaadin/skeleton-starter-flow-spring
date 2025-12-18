package org.vaadin.example;

import jakarta.servlet.http.HttpServletResponse;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.ErrorParameter;
import com.vaadin.flow.router.HasErrorParameter;

@Tag(Tag.DIV)
public class MyErrorPage extends Component
       implements HasErrorParameter<MyException> {

    @Override
    public int setErrorParameter(BeforeEnterEvent event,
                                 ErrorParameter<MyException> parameter) {
        getElement().setText("MyException Error Handler Page");
        return HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
    }
}