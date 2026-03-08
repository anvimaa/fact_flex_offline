import { j as json } from './index-BWA_9C9m.js';
import { sendEmail } from './email-6u-JEkRs.js';
import './utils-FiC4zhrQ.js';
import './api-BO0T-px8.js';
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
import './public-B844qK3e.js';
import './private-BNWMvB1R.js';

async function POST({ request }) {
  try {
    const { nome, email, telefone, assunto, mensagem } = await request.json();
    const result = await sendEmail(nome, email, telefone, assunto, mensagem);
    return json({ success: result, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return json(
      { success: false, message: "Erro ao enviar email. Por favor, tente novamente." },
      { status: 500 }
    );
  }
}

export { POST };
//# sourceMappingURL=_server.ts-B_Jf_Lf-.js.map
