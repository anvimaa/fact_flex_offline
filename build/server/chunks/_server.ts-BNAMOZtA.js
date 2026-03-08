import { a as apiExports } from './api-BO0T-px8.js';
import { j as json } from './index-BWA_9C9m.js';
import { a as PUBLIC_BREVO_API_KEY } from './public-B844qK3e.js';
import 'net';
import 'url';
import 'util';
import 'crypto';
import 'buffer';
import 'http';
import 'https';
import 'stream';
import 'zlib';
import 'querystring';
import 'assert';
import './index-64ZZ3C7M.js';
import 'path';
import 'tls';
import 'fs';
import 'events';
import './performance-now-L-NpSMJt.js';
import './utils-FiC4zhrQ.js';

async function POST({ request }) {
  try {
    const { factura, pdfBase64 } = await request.json();
    const apiInstance = new apiExports.TransactionalEmailsApi();
    apiInstance.setApiKey(apiExports.TransactionalEmailsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const sendSmtpEmail = new apiExports.SendSmtpEmail();
    sendSmtpEmail.subject = `Factura ${factura.numero} - ${factura.empresa.nome}`;
    sendSmtpEmail.htmlContent = `
            <h3>Prezado(a) ${factura.cliente.nome},</h3>
            <p>Segue em anexo a factura ${factura.numero} no valor de ${factura.total}.</p>
            <p>Atenciosamente,<br>${factura.empresa.nome}</p>
        `;
    sendSmtpEmail.sender = { name: factura.empresa.nome, email: "anvimaa@gmail.com" };
    sendSmtpEmail.to = [{ email: "amutransportes@gmail.com", name: factura.cliente.nome }];
    sendSmtpEmail.attachment = [{
      name: `factura-${factura.numero}.pdf`,
      content: pdfBase64
    }];
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email enviado com sucesso!");
    return json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return json(
      { success: false, message: "Erro ao enviar email. Por favor, tente novamente." },
      { status: 500 }
    );
  }
}

export { POST };
//# sourceMappingURL=_server.ts-BNAMOZtA.js.map
