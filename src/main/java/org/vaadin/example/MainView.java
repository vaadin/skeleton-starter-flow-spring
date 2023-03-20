package org.vaadin.example;

import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.progressbar.ProgressBar;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

/**
 * A sample Vaadin view class.
 * <p>
 * To implement a Vaadin view just extend any Vaadin component and use @Route
 * annotation to announce it in a URL as a Spring managed bean.
 * <p>
 * A new instance of this class is created for every new user and every browser
 * tab/window.
 * <p>
 * The main view contains a text field for getting the user name and a button
 * that shows a greeting message in a notification.
 */
@Route
public class MainView extends VerticalLayout {

    public MainView() {

        setClassName("wizardPanel");
        setWidth("600px");

        Avatar avatar = new Avatar("Johnny Goode");

        HorizontalLayout header = new HorizontalLayout(new H3("New issue form, step 1 of 3"), avatar);
        header.setAlignItems(Alignment.CENTER);
        header.setJustifyContentMode(JustifyContentMode.BETWEEN);
        add(header);

        ProgressBar progressBar = new ProgressBar();
        progressBar.setMin(0);
        progressBar.setMax(3);
        progressBar.setValue(1);

        add(progressBar);

        TextField summaryField = new TextField("Summary");
        summaryField.setValue("Component event not propagated");

        TextField labelField = new TextField("Labels");
        labelField.setValue("events, flow");

        TextField authorField = new TextField("Author");
        authorField.setValue("Johnny B. Goode");

        NumberField severityField = new NumberField("Severity");
        severityField.setMin(1);
        severityField.setMax(10);
        severityField.setStep(1);
        severityField.setStepButtonsVisible(true);
        severityField.setValue(7.0);

        Checkbox termsCheckbox = new Checkbox("I have read and accepted the terms");
        termsCheckbox.setValue(true);

        TextArea descriptionTextArea = new TextArea("Description");
        descriptionTextArea.setPlaceholder("Describe the issue");

        add(summaryField, labelField, authorField, severityField, descriptionTextArea, termsCheckbox);


        Button okButton = new Button("Continue");
        Button cancelButton = new Button("Cancel");

        HorizontalLayout buttons = new HorizontalLayout(cancelButton, okButton);

        add(buttons);
        setHorizontalComponentAlignment(Alignment.END, buttons);

    }

}
