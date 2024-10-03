package org.vaadin.example;

import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Menu;
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
@Menu(title = "Editor View")
@Route("editor")
public class RichTextEditorView extends VerticalLayout {

    public RichTextEditorView() {
        com.vaadin.flow.component.richtexteditor.RichTextEditor rte = new com.vaadin.flow.component.richtexteditor.RichTextEditor();
        rte.setSizeFull();
        String valueAsHtml = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Rich Text Example</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            margin: 20px;
                        }
                        h1, h2 {
                            color: #2c3e50;
                        }
                        p {
                            margin-bottom: 15px;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        table, th, td {
                            border: 1px solid #ccc;
                        }
                        th, td {
                            padding: 10px;
                            text-align: left;
                        }
                        ul {
                            list-style-type: disc;
                            margin-left: 20px;
                        }
                        ol {
                            list-style-type: decimal;
                            margin-left: 20px;
                        }
                        .quote {
                            font-style: italic;
                            color: #555;
                            border-left: 4px solid #ccc;
                            padding-left: 10px;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <h2>Welcome to Rich Text HTML Example</h2>
                    <h3>Introduction</h3>
                    <p>
                        This is an example of a <strong>rich-text</strong> HTML document that includes various HTML elements.
                        You can use <em>italic</em> or <strong>bold</strong> formatting to emphasize text.
                    </p>
                </body>
                </html>
                """;
        rte.setValue(valueAsHtml);
        add(rte);
    }
}
