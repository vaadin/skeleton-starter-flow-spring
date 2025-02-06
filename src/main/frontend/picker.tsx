import {type ReactElement, useState} from 'react';
import {Button, VerticalLayout} from "@vaadin/react-components";
import {ReactAdapterElement, type RenderHooks} from "Frontend/generated/flow/ReactAdapter";
import { HelloEndpoint } from "Frontend/generated/endpoints";

class PickerElement extends ReactAdapterElement {
  protected override render(hooks: RenderHooks): ReactElement | null {
    const [notifications, setNotifications] = useState([] as string[]);
    return (
      <>
        <VerticalLayout>
          <Button onClick={async () => {
              const serverResponse = await HelloEndpoint.sayHello('Mike');
              setNotifications(notifications.concat(serverResponse));
            }}
          > Say hello </Button>
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
        </VerticalLayout>
      </>
    );
  }
}

customElements.define(
  "my-picker",
  PickerElement
);
