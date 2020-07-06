package org.vaadin.example;

import java.util.List;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import org.apache.commons.compress.utils.Lists;
import org.apache.commons.lang3.StringUtils;

@Route("gridDemo")
public class GridViewDemo extends VerticalLayout{

    private final TextField textField;
    private final Grid<Employee> grid;
    private final Button addNewButton;
    private final EmployeeEditor editor;
    private static List<Employee> list;

    public GridViewDemo(EmployeeEditor editor) {
        list = Lists.newArrayList();
        list.add(new Employee(1, "edward", "calumn"));
        list.add(new Employee(2, "xxx", "yyy"));
        list.add(new Employee(3, "sda", "hgf"));
        list.add(new Employee(4, "zxc", "kjh"));

        this.editor = editor;

        this.grid = new Grid<>(Employee.class);
        grid.setColumns("id", "firstName", "lastName");
        grid.setHeight("200px");
        grid.getColumnByKey("id").setWidth("50px").setFlexGrow(0);
        grid.setItems(list);
        this.textField = new TextField();
        textField.setPlaceholder("Filter by last name");
        this.addNewButton = new Button("new employee", VaadinIcon.PLUS.create());
        final HorizontalLayout horizontalLayout = new HorizontalLayout(this.textField, this.addNewButton);
        horizontalLayout.add(textField, addNewButton);
        add(horizontalLayout, grid, editor);

        textField.setValueChangeMode(ValueChangeMode.EAGER);
        textField.addValueChangeListener(e -> listEmployees(e.getValue()));

        grid.asSingleSelect().addValueChangeListener(e -> {
            editor.editorEmployee(e.getValue());
        });

        addNewButton.addClickListener(e -> editor.editorEmployee(new Employee("", "")));
        
        editor.setChangeHandler(() -> {
            editor.setVisible(false);
            listEmployees(textField.getValue());
        });

        listEmployees(null);
    }

    void listEmployees(final String filterText) {
        if (StringUtils.isEmpty(filterText)) {
            grid.setItems(list);
        } else {
            final List<Employee> filterList = Lists.newArrayList();
            list.stream().forEach(employee -> {
                if(employee.getLastName().equals(filterText)) {
                    filterList.add(employee);
                }
            });
            grid.setItems(filterList);
        }
    }

    public static List<Employee> getList() {
        return list;
    }

    public class Employee {
        private long id;
        private String firstName;
        private String lastName;

        public Employee(final long id, final String firstName, final String lastName) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public Employee(final String firstName, final String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public void setFirstName(final String firstName) {
            this.firstName = firstName;
        }

        public String getFirstName() {
            return this.firstName;
        }

        public String getLastName() {
            return this.lastName;
        }

        public void setLastName(final String lastName) {
            this.lastName = lastName;
        }

        public void setId(final Long id) {
            this.id = id;
        }

        public long getId() {
            return this.id;
        }
    }
    
}