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
    const { email } = await request.json();
    const apiInstance = new apiExports.ContactsApi();
    apiInstance.setApiKey(apiExports.ContactsApiApiKeys.apiKey, PUBLIC_BREVO_API_KEY);
    const createContact = new apiExports.CreateContact();
    createContact.email = email;
    createContact.listIds = [8];
    createContact.updateEnabled = true;
    await apiInstance.createContact(createContact);
    return json({
      success: true,
      message: "Inscrição realizada com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao inscrever na newsletter:", error);
    if (error.response?.text?.includes("Contact already exist")) {
      return json({
        success: false,
        message: "Este email já está inscrito em nossa newsletter."
      }, { status: 400 });
    }
    return json({
      success: false,
      message: "Erro ao realizar inscrição. Por favor, tente novamente."
    }, { status: 500 });
  }
}

export { POST };
//# sourceMappingURL=_server.ts-BIUhndYr.js.map
