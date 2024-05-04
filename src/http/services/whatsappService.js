import twilio from 'twilio';
import config from '@config/environment.js'; 

class WhatsAppService {
  constructor() {
    // Initialize Twilio client
    const accountSid = config.twilio_live_sid; 
    const authToken = config.twilio_live_token; 
    this.client = twilio(accountSid, authToken);
    this.sandboxNumber = config.twilio_sandbox_number; // Your Twilio Sandbox Number
  }

  async sendWhatsAppMessage(to, message) {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: this.sandboxNumber,
        to: `whatsapp:${to}`,
      });
      console.log(`Message sent to ${to}: ${response.sid}`);
      return response;
    } catch (error) {
      console.error(`Failed to send message: ${error}`);
      throw error;
    }
  }

  async sendWhatsAppMessageWithTemplate(to, messageTemplate, placeholders) {
    // Retrieve message template from database or configuration based on messageTemplate parameter
    // Replace placeholders in the message template with actual values
    // Call sendWhatsAppMessage method with the composed message
    try {
      const composedMessage = this.composeMessageFromTemplate(messageTemplate, placeholders);
      const response = await this.sendWhatsAppMessage(to, composedMessage);
      return response;
    } catch (error) {
      throw error;
    }
  }

  composeMessageFromTemplate(template, placeholders) {
    // Replace placeholders in the message template with actual values
    // For example, replace {{customerName}} with actual customer name from placeholders
    // Implement this based on your template structure
    let composedMessage = template;
    for (const [placeholder, value] of Object.entries(placeholders)) {
      composedMessage = composedMessage.replace(`{{${placeholder}}}`, value);
    }
    return composedMessage;
  }
}

export default WhatsAppService;
