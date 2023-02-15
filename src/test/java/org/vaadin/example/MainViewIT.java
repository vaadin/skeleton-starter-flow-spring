package org.vaadin.example;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.Keys;

import com.vaadin.flow.component.button.testbench.ButtonElement;
import com.vaadin.flow.component.notification.testbench.NotificationElement;
import com.vaadin.flow.component.textfield.testbench.TextFieldElement;
import com.vaadin.testbench.BrowserTest;
import com.vaadin.testbench.BrowserTestBase;

public class MainViewIT extends BrowserTestBase {

    /**
     * If running on CI, get the host name from environment variable HOSTNAME
     *
     * @return the host name
     */
    private static String getDeploymentHostname() {
        String hostname = System.getenv("HOSTNAME");
        if (hostname != null && !hostname.isEmpty()) {
            return hostname;
        }
        return "localhost";
    }

    @BeforeEach
    public void open() {
        getDriver().get("http://"+getDeploymentHostname()+":8080/");
    }

    @BrowserTest
    public void clickingButtonShowsNotification() {
        Assertions.assertFalse($(NotificationElement.class).exists());
        $(ButtonElement.class).waitForFirst().click();
        Assertions.assertTrue($(NotificationElement.class).waitForFirst().isOpen());
    }

    @BrowserTest
    public void clickingButtonTwiceShowsTwoNotifications() {
        Assertions.assertFalse($(NotificationElement.class).exists());
        ButtonElement button = $(ButtonElement.class).waitForFirst();
        button.click();
        button.click();
        $(NotificationElement.class).waitForFirst();
        Assertions.assertEquals(2, $(NotificationElement.class).all().size());
    }

    @BrowserTest
    public void testClickButtonShowsHelloAnonymousUserNotificationWhenUserNameIsEmpty() {
        ButtonElement button = $(ButtonElement.class).waitForFirst();
        button.click();
        NotificationElement notification = $(NotificationElement.class).waitForFirst();
        Assertions.assertEquals("Hello anonymous user", notification.getText());
    }

    @BrowserTest
    public void testClickButtonShowsHelloUserNotificationWhenUserIsNotEmpty() {
        TextFieldElement textField = $(TextFieldElement.class).waitForFirst();
        textField.setValue("Vaadiner");
        $(ButtonElement.class).waitForFirst().click();
        NotificationElement notification = $(NotificationElement.class).waitForFirst();
        Assertions.assertEquals("Hello Vaadiner", notification.getText());
    }

    @BrowserTest
    public void testEnterShowsHelloUserNotificationWhenUserIsNotEmpty() {
        TextFieldElement textField = $(TextFieldElement.class).waitForFirst();
        textField.setValue("Vaadiner");
        textField.sendKeys(Keys.ENTER);
        NotificationElement notification = $(NotificationElement.class).waitForFirst();
        Assertions.assertEquals("Hello Vaadiner", notification.getText());
    }
}
