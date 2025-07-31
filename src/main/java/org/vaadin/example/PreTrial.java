package org.vaadin.example;

import org.jsoup.nodes.DataNode;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.flow.server.VaadinServiceInitListener;

@Component
public class PreTrial implements VaadinServiceInitListener {

    static final String ADD_SPLASH_SCREEN = """
            const showPreTrialSplashScreen = (shadowRoot: ShadowRoot | null, message: ProductAndMessage) => {
              if (shadowRoot && !shadowRoot.innerHTML.includes('vaadin-pretrial')) {
                const expiredPreTrial = message.preTrial?.trialState === 'EXPIRED';
                shadowRoot.innerHTML = `<slot></slot><vaadin-pretrial ${expiredPreTrial ? 'expired' : ''}>
                  This application is using:
                  <div slot='products'>
                    This application is using:
                    <ul>
                      <li>${message.product.name}</li>
                    </ul>
                  </div>
                </vaadin-pretrial>`;
              }
            };
            """;


    @Override
    public void serviceInit(ServiceInitEvent serviceInitEvent) {
        serviceInitEvent.addIndexHtmlRequestListener(index -> {
            VaadinRequest request = index.getVaadinRequest();
            if (request.getParameter("banner") != null) {
                addScript(index.getDocument(), """
                        const container = document.createElement('div');
                        document.body.appendChild(container);
                        const root = container.attachShadow({ mode: 'closed' })
                        root.innerHTML = '<slot></slot><vaadin-commercial-banner></vaadin-commercial-banner>'
                        """);
            }
            String splash = request.getParameter("splash");
            if (splash != null) {
                String attributes = switch (splash) {
                    case "expired" -> "expired";
                    case "start-failed" -> "start-failure";
                    case "start-expired" -> "start-failure='expired'";
                    default -> "";
                };
                addScript(index.getDocument(), """
                        const container = document.createElement('div');
                        document.body.appendChild(container);
                        const root = container.attachShadow({ mode: 'closed' })
                        root.innerHTML = `<slot></slot><vaadin-pretrial %s>
                          This application is using:
                          <div slot='products'>
                            This application is using:
                            <ul>
                              <li>vaadin-cookie-consent</li>
                            </ul>
                          </div>
                        </vaadin-pretrial>`;
                        """.formatted(attributes));
            }
        });

    }

    private static void addScript(Document indexDocument, String script) {
        Element elm = new Element("script");
        elm.attr("type", "module");
        elm.appendChild(new DataNode(script));
        indexDocument.head().insertChildren(0, elm);
    }

}
