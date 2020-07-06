package org.vaadin.example;

import java.util.Objects;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyNotifier;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.spring.annotation.SpringComponent;
import com.vaadin.flow.spring.annotation.UIScope;

import org.vaadin.example.GridViewDemo.Employee;

@SpringComponent
@UIScope
public class EmployeeEditor extends VerticalLayout implements KeyNotifier{

    private GridViewDemo.Employee employee;

    private TextField firstName = new TextField("FirstName");
    private TextField lastName = new TextField("LastName");

    private Button save = new Button("save", VaadinIcon.CHECK.create(), e -> Notification.show("save data"));
    private Button cancle = new Button("cancle");
    private Button delete = new Button("delete", VaadinIcon.TRASH.create());
    HorizontalLayout horizontalLayout = new HorizontalLayout(save, cancle, delete);
    Binder<GridViewDemo.Employee> binder = new Binder<>(GridViewDemo.Employee.class);
    private ChangeHandler changeHandler;

    public EmployeeEditor() {
        add(firstName, lastName, horizontalLayout);
        binder.bindInstanceFields(this);
        setSpacing(true);
        save.getElement().getThemeList().add("primary");
        delete.getElement().getThemeList().add("error");

        addKeyPressListener(Key.ENTER, e -> save());

        save.addClickListener(e -> save());
        delete.addClickListener(e -> delete());
        cancle.addClickListener(e -> editorEmployee(employee));
        setVisible(false);
    }

    public void editorEmployee(GridViewDemo.Employee e) {
        if(e == null) {
            setVisible(false);
            return;
        }

        final boolean exist = Objects.isNull(e.getId());
        if(!exist) {
            //模拟数据查询
            GridViewDemo.getList().stream().forEach(em -> {
                if(em.getId() == e.getId()) {
                    employee = em;
                }
            });
        } else {
            employee = null;
        }

        cancle.setVisible(exist);
        setVisible(true);
        binder.setBean(employee);
        firstName.focus();
    }


    public void save() {
        changeHandler.onChange();
    }

    public void delete() {
        changeHandler.onChange();
    }

    public interface ChangeHandler {
        void onChange();
    }

    public void setChangeHandler(ChangeHandler changeHandler) {
        this.changeHandler = changeHandler;
    }
}