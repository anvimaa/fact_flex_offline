import { a as apiExports } from './api-BO0T-px8.js';
import { a as PUBLIC_BREVO_API_KEY } from './public-B844qK3e.js';
import { B as BREVO_EMAIL } from './private-BNWMvB1R.js';
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

async function sendEmail(nome, email, telefone, assunto, mensagem) {
  try {
    const apiInstance = new apiExports.TransactionalEmailsApi();
    apiInstance.setApiKey(apiExports.TransactionalEmailsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const sendSmtpEmail = new apiExports.SendSmtpEmail();
    sendSmtpEmail.subject = `Novo contato: ${assunto}`;
    sendSmtpEmail.htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
                    .header { background-color: #1e293b; padding: 32px; text-align: center; }
                    .content { padding: 40px; }
                    .footer { padding: 24px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f3f4f6; }
                    .field { margin-bottom: 24px; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px; }
                    .label { font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
                    .value { font-size: 16px; color: #111827; }
                    .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-top: 8px; }
                    h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>FACT FLEXI</h1>
                    </div>
                    <div class="content">
                        <div style="margin-bottom: 32px;">
                            <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 20px;">Novo Contato Recebido</h2>
                            <p style="color: #4b5563; margin: 0;">Recebeu uma nova mensagem vinda do formulário de contacto do website.</p>
                        </div>
                        
                        <div class="field">
                            <span class="label">Remetente</span>
                            <span class="value"><strong>${nome}</strong> (${email})</span>
                        </div>
                        
                        <div class="field">
                            <span class="label">Telefone</span>
                            <span class="value">${telefone || "Não fornecido"}</span>
                        </div>
                        
                        <div class="field">
                            <span class="label">Assunto</span>
                            <span class="value">${assunto}</span>
                        </div>
                        
                        <div class="field" style="border: none;">
                            <span class="label">Mensagem</span>
                            <div class="message-box">
                                ${mensagem.replace(/\n/g, "<br>")}
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <p style="margin: 0;">© ${(/* @__PURE__ */ new Date()).getFullYear()} FACT FLEXI. Este é um e-mail gerado automaticamente.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    sendSmtpEmail.sender = { name: "FACT FLEXI", email: BREVO_EMAIL };
    sendSmtpEmail.to = [{ email: BREVO_EMAIL, name: "FACT FLEXI" }];
    sendSmtpEmail.replyTo = { email, name: nome };
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
}
async function sendDocumentShareEmail(toEmail, toName, docNumber, docType, docValue, link, customMessage) {
  try {
    const apiInstance = new apiExports.TransactionalEmailsApi();
    apiInstance.setApiKey(apiExports.TransactionalEmailsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const sendSmtpEmail = new apiExports.SendSmtpEmail();
    sendSmtpEmail.subject = `Documento Fiscal - ${docNumber}`;
    const messageHtml = customMessage ? `<p>${customMessage.replace(/\n/g, "<br>")}</p><br>` : "";
    sendSmtpEmail.htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
                    .header { background-color: #1e293b; padding: 32px; text-align: center; }
                    .content { padding: 40px; }
                    .footer { padding: 24px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f3f4f6; }
                    .button { background-color: #3b82f6; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin: 24px 0; }
                    .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
                    .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #eff6ff; padding-bottom: 8px; }
                    .info-row:last-child { border: none; margin-bottom: 0; padding-bottom: 0; }
                    .info-label { color: #64748b; font-size: 13px; font-weight: 500; }
                    .info-value { color: #1e293b; font-weight: 600; }
                    h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
                    h2 { color: #111827; margin: 0 0 16px 0; font-size: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>FACT FLEXI</h1>
                    </div>
                    <div class="content">
                        <h2>Olá ${toName},</h2>
                        ${messageHtml}
                        <p style="color: #4b5563;">Informamos que foi emitido um novo documento fiscal em seu nome. Abaixo encontram-se os detalhes principais:</p>
                        
                        <div class="info-card">
                            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                                <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600;">Detalhes do Documento</span>
                            </div>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Tipo</td>
                                    <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: 600;">${docType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Número</td>
                                    <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: 600;">${docNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Valor Total</td>
                                    <td style="padding: 8px 0; text-align: right; color: #2563eb; font-weight: 700; font-size: 18px;">${docValue}</td>
                                </tr>
                            </table>
                        </div>

                        <p style="color: #4b5563;">Pode visualizar, descarregar ou imprimir o documento clicando no botão abaixo:</p>
                        
                        <div style="text-align: center;">
                            <a href="${link}" class="button">Visualizar Documento</a>
                        </div>
                        
                        <p style="font-size: 12px; color: #94a3b8; margin-top: 32px;">Se o botão não funcionar, copie e cole este link no seu navegador:<br>
                        <a href="${link}" style="color: #3b82f6; text-decoration: none;">${link}</a></p>
                    </div>
                    <div class="footer">
                        <p style="margin: 0 0 8px 0;">Este é um e-mail automático enviado por <strong>FACT FLEXI</strong>.</p>
                        <p style="margin: 0;">© ${(/* @__PURE__ */ new Date()).getFullYear()} FACT FLEXI. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    sendSmtpEmail.sender = { name: "FACT FLEXI", email: BREVO_EMAIL };
    sendSmtpEmail.to = [{ email: toEmail, name: toName }];
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error("Erro ao enviar email de documento:", error);
    return false;
  }
}
async function sendPartnerApplicationEmail(data) {
  try {
    const apiInstance = new apiExports.TransactionalEmailsApi();
    apiInstance.setApiKey(apiExports.TransactionalEmailsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const partnerTypeLabels = {
      revendedor: "Revendedor",
      integrador: "Integrador de Software",
      consultor: "Consultor / Contabilista",
      associacao: "Associação Empresarial"
    };
    const sendSmtpEmail = new apiExports.SendSmtpEmail();
    sendSmtpEmail.subject = `Nova Candidatura de Parceiro: ${data.companyName}`;
    sendSmtpEmail.htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
                    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
                    .header { background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); padding: 32px; text-align: center; }
                    .badge { display: inline-block; background: rgba(255,255,255,0.15); color: #fff; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 14px; border-radius: 20px; margin-bottom: 12px; }
                    .content { padding: 40px; }
                    .footer { padding: 24px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f3f4f6; }
                    .field { margin-bottom: 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 16px; }
                    .field:last-child { border-bottom: none; }
                    .label { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 4px; }
                    .value { font-size: 15px; color: #111827; }
                    .section-title { font-size: 13px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em; margin: 28px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #f3f4f6; }
                    .message-box { background: #faf5ff; border-left: 4px solid #7c3aed; padding: 16px; border-radius: 4px; margin-top: 8px; font-size: 14px; color: #374151; }
                    .type-badge { display: inline-block; background: #ede9fe; color: #6d28d9; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
                    h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
                    h2 { color: #111827; margin: 0 0 8px 0; font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="badge">Programa de Parceiros</div>
                        <h1>FACT FLEXI</h1>
                    </div>
                    <div class="content">
                        <div style="margin-bottom: 24px;">
                            <h2>Nova Candidatura de Parceiro</h2>
                            <p style="color: #4b5563; margin: 0;">Recebeu uma nova candidatura ao Programa de Parceiros FACT FLEXI.</p>
                        </div>

                        <div class="section-title">Dados da Empresa</div>

                        <div class="field">
                            <span class="label">Nome da Empresa</span>
                            <span class="value"><strong>${data.companyName}</strong></span>
                        </div>

                        <div class="field">
                            <span class="label">Tipo de Parceria Pretendido</span>
                            <span class="type-badge">${partnerTypeLabels[data.partnerType] ?? data.partnerType}</span>
                        </div>

                        <div class="field">
                            <span class="label">Província</span>
                            <span class="value">${data.province}</span>
                        </div>

                        ${data.website ? `
                        <div class="field">
                            <span class="label">Website</span>
                            <span class="value"><a href="${data.website}" style="color: #7c3aed;">${data.website}</a></span>
                        </div>` : ""}

                        <div class="section-title">Pessoa de Contacto</div>

                        <div class="field">
                            <span class="label">Nome</span>
                            <span class="value">${data.contactName}</span>
                        </div>

                        <div class="field">
                            <span class="label">E-mail</span>
                            <span class="value"><a href="mailto:${data.email}" style="color: #7c3aed;">${data.email}</a></span>
                        </div>

                        <div class="field">
                            <span class="label">Telefone</span>
                            <span class="value">${data.phone}</span>
                        </div>

                        ${data.message ? `
                        <div class="section-title">Proposta</div>
                        <div class="field" style="border: none;">
                            <span class="label">Mensagem</span>
                            <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
                        </div>` : ""}
                    </div>
                    <div class="footer">
                        <p style="margin: 0;">© ${(/* @__PURE__ */ new Date()).getFullYear()} FACT FLEXI. Candidatura recebida automaticamente.</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    sendSmtpEmail.sender = { name: "FACT FLEXI", email: BREVO_EMAIL };
    sendSmtpEmail.to = [{ email: BREVO_EMAIL, name: "FACT FLEXI Parceiros" }];
    sendSmtpEmail.replyTo = { email: data.email, name: data.contactName };
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail de candidatura de parceiro:", error);
    return false;
  }
}

export { sendDocumentShareEmail, sendEmail, sendPartnerApplicationEmail };
//# sourceMappingURL=email-6u-JEkRs.js.map
