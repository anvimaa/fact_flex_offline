import { W as WHATSAPP_ACCESS_TOKEN, m as WHATSAPP_PHONE_ID } from './private-BNWMvB1R.js';

const WHATSAPP_API_URL = "https://graph.facebook.com/v19.0";
class WhatsAppService {
  token;
  phoneId;
  constructor() {
    this.token = WHATSAPP_ACCESS_TOKEN;
    this.phoneId = WHATSAPP_PHONE_ID;
  }
  async sendMessage(payload) {
    if (!this.token || !this.phoneId) {
      console.warn(
        "WhatsApp credentials not configured (WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_ID missing)."
      );
      return { success: false, error: "WhatsApp credentials not configured." };
    }
    try {
      const response = await fetch(`${WHATSAPP_API_URL}/${this.phoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API Error:", JSON.stringify(errorData, null, 2));
        throw new Error(`WhatsApp API Error: ${response.statusText}`);
      }
      return { success: true, data: await response.json() };
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      return { success: false, error: error.message };
    }
  }
  /**
   * Sends a simple text message with a link to the document.
   * Note: For starting conversations outside the 24h window, you MUST use templates.
   * This function assumes an active conversation or that you are using a utility template.
   * If you don't have a template, this might fail for new conversations.
   *
   * However, for simplicity and "free tier" generic usage without complex template setup:
   * We will try to send a text message. If it fails due to policy, we'd need a template.
   *
   * Ideally, usage: sendDocumentMessage(phone, "Hello...", "https://...")
   */
  async sendDocumentMessage(to, message, link) {
    const cleanPhone = to.replace(/\D/g, "");
    const textBody = `${message}

Visualizar Documento: ${link}`;
    return this.sendMessage({
      messaging_product: "whatsapp",
      to: cleanPhone,
      type: "text",
      text: {
        body: textBody
      }
    });
  }
  /**
   * Sends a template message (Recommended for business initiated conversations).
   * You need to create a template in Meta Business Manager named 'document_share'
   * with parameters for {{1}} (doc number), {{2}} (value), {{3}} (link).
   */
  async sendDocumentTemplate(to, docNumber, value, link) {
    const cleanPhone = to.replace(/\D/g, "");
    return this.sendMessage({
      messaging_product: "whatsapp",
      to: cleanPhone,
      type: "template",
      template: {
        name: "document_share",
        // Replace with your actual template name
        language: {
          code: "pt_PT"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: docNumber },
              { type: "text", text: value },
              { type: "text", text: link }
            ]
          }
        ]
      }
    });
  }
}

export { WhatsAppService };
//# sourceMappingURL=whatsapp-DGOmBbG6.js.map
