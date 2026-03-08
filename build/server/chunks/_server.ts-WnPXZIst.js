import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
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

const GET = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const clientes = await db.cliente.findMany({
      where: { empresaId },
      orderBy: {
        createdAt: "desc"
      }
    });
    return json(clientes);
  } catch (error) {
    return json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return json({ error: "Não autorizado" }, { status: 401 });
    }
    const data = await request.json();
    const { nome, nif } = data;
    if (!nome || !nif) {
      return json({ error: "Nome e NIF são obrigatórios" }, { status: 400 });
    }
    const existente = await db.cliente.findFirst({
      where: {
        empresaId,
        nif
      }
    });
    if (existente) {
      return json({ error: "Já existe um cliente com este NIF" }, { status: 400 });
    }
    const novoCliente = await db.cliente.create({
      data: {
        empresaId,
        nome,
        nif,
        endereco: "Luanda, Angola",
        // Default
        tipo: "SINGULAR"
      }
    });
    return json(novoCliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return json({ error: error.message || "Erro interno" }, { status: 500 });
  }
};

export { GET, POST };
//# sourceMappingURL=_server.ts-WnPXZIst.js.map
