import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
import './auth-ke1JlaCA.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
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

const GET = async ({ url, request }) => {
  const search = url.searchParams.get("search")?.toLowerCase() || "";
  const empresaId = await getEmpresaId(request);
  if (search.length < 2) {
    return json([]);
  }
  try {
    const clientes = await db.cliente.findMany({
      where: {
        empresaId,
        OR: [{ nome: { contains: search } }, { nif: { contains: search } }]
      },
      take: 10,
      select: {
        nome: true,
        nif: true,
        endereco: true,
        tipo: true,
        email: true,
        pais: true,
        caixaPostal: true,
        cidade: true,
        website: true,
        telefone: true,
        telemovel: true,
        fax: true
      }
    });
    return json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return new Response("Erro ao buscar clientes", { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-C9SqeNzr.js.map
