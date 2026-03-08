import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
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

const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 20;
  const skip = (page - 1) * limit;
  const acao = url.searchParams.get("acao");
  const usuarioId = url.searchParams.get("usuarioId");
  const search = url.searchParams.get("search");
  const dataInicio = url.searchParams.get("dataInicio");
  const dataFim = url.searchParams.get("dataFim");
  const where = {
    documento: {
      empresaId
    }
  };
  if (acao && acao !== "all") {
    where.acao = acao;
  }
  if (usuarioId && usuarioId !== "all") {
    where.usuarioId = usuarioId;
  }
  if (search) {
    where.OR = [
      { documento: { numero: { contains: search, mode: "insensitive" } } },
      { descricao: { contains: search, mode: "insensitive" } }
    ];
  }
  if (dataInicio || dataFim) {
    where.createdAt = {};
    if (dataInicio) {
      where.createdAt.gte = new Date(dataInicio);
    }
    if (dataFim) {
      const endDate = new Date(dataFim);
      endDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = endDate;
    }
  }
  const [logs, total] = await Promise.all([
    db.logDocumento.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        documento: {
          select: {
            id: true,
            numero: true,
            tipoDocumento: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: limit,
      skip
    }),
    db.logDocumento.count({ where })
  ]);
  const users = await db.user.findMany({
    where: {
      empresaId
    },
    select: {
      id: true,
      name: true
    }
  });
  const actionsResult = await db.logDocumento.findMany({
    where: {
      documento: {
        empresaId
      }
    },
    select: {
      acao: true
    },
    distinct: ["acao"]
  });
  const actions = actionsResult.map((a) => a.acao);
  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    filters: {
      users,
      actions
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 30;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-dKyzbeCc.js')).default;
const server_id = "src/routes/(app)/configuracoes/log-documentos/+page.server.ts";
const imports = ["_app/immutable/nodes/30.sspOvITI.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/DmSIVdh7.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/DWMGhE4s.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/C8ASZhvd.js","_app/immutable/chunks/91OW602I.js","_app/immutable/chunks/dSyDDdoo.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=30-tfuzK2vR.js.map
