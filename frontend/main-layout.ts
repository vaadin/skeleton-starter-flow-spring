import {LitElement, html, css, customElement} from 'lit-element';

@customElement('main-layout')
export class MainLayoutElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
