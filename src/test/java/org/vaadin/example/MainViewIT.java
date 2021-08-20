package org.vaadin.example;

import com.vaadin.flow.component.textfield.testbench.TextFieldElement;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import com.vaadin.flow.component.button.testbench.ButtonElement;
import com.vaadin.flow.component.notification.testbench.NotificationElement;
import com.vaadin.flow.theme.lumo.Lumo;

public class MainViewIT extends AbstractViewTest {

    @Test
    public void clickingButtonShowsNotification() {
        Assert.assertFalse($(NotificationElement.class).exists());
        $(ButtonElement.class).waitForFirst().click();
        Assert.assertTrue($(NotificationElement.class).waitForFirst().isOpen());
    }

    @Test
    public void clickingButtonTwiceShowsTwoNotifications() {
        Assert.assertFalse($(NotificationElement.class).exists());
        ButtonElement button = $(ButtonElement.class).waitForFirst();
        button.click();
        button.click();
        $(NotificationElement.class).waitForFirst();
        Assert.assertEquals(2, $(NotificationElement.class).all().size());
    }

    @Test
    public void buttonIsUsingLumoTheme() {
        WebElement element = $(ButtonElement.class).waitForFirst();
        assertThemePresentOnElement(element, Lumo.class);
    }

    @Test
    public void testClickButtonShowsHelloAnonymousUserNotificationWhenUserNameIsEmpty() {
        ButtonElement button = $(ButtonElement.class).waitForFirst();
        button.click();
        $(NotificationElement.class).waitForFirst();
        Assert.assertTrue($(NotificationElement.class).exists());
        NotificationElement notification = $(NotificationElement.class).first();
        Assert.assertEquals("Hello anonymous user", notification.getText());
    }

    @Test
    public void testClickButtonShowsHelloUserNotificationWhenUserIsNotEmpty() {
        TextFieldElement textField = $(TextFieldElement.class).waitForFirst();
        textField.setValue("Vaadiner");
        $(ButtonElement.class).waitForFirst().click();
        $(NotificationElement.class).waitForFirst();
        Assert.assertTrue($(NotificationElement.class).exists());
        NotificationElement notification = $(NotificationElement.class).first();
        Assert.assertEquals("Hello Vaadiner", notification.getText());
    }

    @Test
    public void testEnterShowsHelloUserNotificationWhenUserIsNotEmpty() {
        TextFieldElement textField = $(TextFieldElement.class).waitForFirst();
        textField.setValue("Vaadiner");
        textField.sendKeys(Keys.ENTER);
        $(NotificationElement.class).waitForFirst();
        Assert.assertTrue($(NotificationElement.class).exists());
        NotificationElement notification = $(NotificationElement.class).first();
        Assert.assertEquals("Hello Vaadiner", notification.getText());
    }
}
