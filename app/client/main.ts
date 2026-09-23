import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("starter-app")
export class StarterApp extends LitElement {
  // Render into light DOM so missing.css styles apply without a shadow stylesheet.
  override createRenderRoot(): HTMLElement {
    return this;
  }

  @state()
  private message = "Loading…";

  override connectedCallback(): void {
    super.connectedCallback();
    void this.loadMessage();
  }

  private async loadMessage(): Promise<void> {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: { message: string } = await response.json();
      this.message = data.message;
    } catch {
      this.message = "Could not reach the server.";
    }
  }

  override render() {
    return html`<p>${this.message}</p>`;
  }
}
