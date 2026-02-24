package org.vaadin.example;

import com.vaadin.browserless.SpringBrowserlessTest;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.textfield.TextField;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MainViewTest extends SpringBrowserlessTest {

    @BeforeEach
    public void open() {
        navigate(MainView.class);
    }

    @Test
    public void clickingButtonShowsNotification() {
        Assertions.assertTrue($(Paragraph.class).all().isEmpty());
        test($(Button.class).single()).click();
        Assertions.assertFalse($(Paragraph.class).all().isEmpty());
    }

    @Test
    public void clickingButtonTwiceShowsTwoNotifications() {
        Assertions.assertTrue($(Paragraph.class).all().isEmpty());
        Button button = $(Button.class).single();
        test(button).click();
        test(button).click();
        Assertions.assertEquals(2, $(Paragraph.class).all().size());
    }

    @Test
    public void testClickButtonShowsHelloAnonymousUserNotificationWhenUserNameIsEmpty() {
        test($(Button.class).single()).click();
        Paragraph msg = $(Paragraph.class).single();
        Assertions.assertEquals("Hello anonymous user", msg.getText());
    }

    @Test
    public void testClickButtonShowsHelloUserNotificationWhenUserIsNotEmpty() {
        test($(TextField.class).single()).setValue("Vaadiner");
        test($(Button.class).single()).click();
        Paragraph msg = $(Paragraph.class).single();
        Assertions.assertEquals("Hello Vaadiner", msg.getText());
    }

    @Test
    public void testEnterShowsHelloUserNotificationWhenUserIsNotEmpty() {
        test($(TextField.class).single()).setValue("Vaadiner");
        fireShortcut(Key.ENTER);
        Paragraph msg = $(Paragraph.class).single();
        Assertions.assertEquals("Hello Vaadiner", msg.getText());
    }
}
