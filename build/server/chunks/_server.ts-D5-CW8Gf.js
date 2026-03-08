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

const GET = async ({ url, locals, request }) => {
  const search = url.searchParams.get("search");
  const empresaId = await getEmpresaId(request);
  if (!search || !empresaId) {
    return json([]);
  }
  try {
    const produtos = await db.produto.findMany({
      where: {
        empresaId,
        OR: [{ codigo: { contains: search } }, { descricao: { contains: search } }]
      },
      include: {
        taxa: true
      },
      take: 10
    });
    return json(
      produtos.map((produto) => ({
        id: produto.id,
        codigo: produto.codigo,
        descricao: produto.descricao,
        precoUnitario: produto.precoUnitario,
        taxa: produto.taxa?.valor ?? 0,
        quantidade: produto.quantidade,
        desconto: produto.desconto,
        motivoIsento: produto.motivoIsento || ""
      }))
    );
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-D5-CW8Gf.js.map
