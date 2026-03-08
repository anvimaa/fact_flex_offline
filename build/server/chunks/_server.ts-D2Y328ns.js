import { a as auth } from './auth-ke1JlaCA.js';
import { d as db } from './db-BUWqG89e.js';
import { j as json } from './index-BWA_9C9m.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import '@prisma/client';
import './private-BNWMvB1R.js';
import './public-B844qK3e.js';
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
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './utils-FiC4zhrQ.js';

const POST = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session) {
      return new Response("Sem autorização", { status: 401 });
    }
    const data = await request.json();
    const existingCompany = await db.empresa.findFirst({
      where: {
        nif: data.nif
      }
    });
    if (existingCompany) {
      return json({ error: "Já existe uma empresa registrada com esse NIF!" }, { status: 400 });
    }
    let parceiroId = null;
    let codigoAplicado = null;
    if (data.codigoRecomendacao) {
      const parceiro = await db.parceiro.findUnique({
        where: { codigoRecomendacao: data.codigoRecomendacao }
      });
      if (parceiro && parceiro.ativo) {
        parceiroId = parceiro.id;
        codigoAplicado = data.codigoRecomendacao;
      }
    }
    const empresa = await db.empresa.create({
      data: {
        nome: data.nome,
        nif: data.nif,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
        cidade: data.cidade,
        pais: data.pais,
        website: data.website,
        logo: data.logoUrl,
        parceiroId,
        codigoRecomendacaoAplicado: codigoAplicado,
        users: {
          connect: {
            id: session.user.id
          }
        }
      }
    });
    await db.user.update({
      where: {
        id: session.user.id
      },
      data: {
        empresaId: empresa.id
      }
    });
    return json(empresa);
  } catch (error) {
    console.error("Erro ao criar a empresa.:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-D2Y328ns.js.map
