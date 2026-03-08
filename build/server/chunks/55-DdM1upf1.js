import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import { Z as ZodError, o as objectType, s as stringType, h as arrayType, i as ZodIssueCode, N as NEVER, n as numberType } from './types-C7xnNV5k.js';
import '@prisma/client';
import './auth-ke1JlaCA.js';
import 'node:crypto';
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
import './utils-FiC4zhrQ.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const itemSchema = objectType({
  produtoId: stringType().min(1),
  quantidade: numberType().min(0.01)
});
const entradaSchema = objectType({
  items: stringType().transform((str, ctx) => {
    try {
      return arrayType(itemSchema).parse(JSON.parse(str));
    } catch (e) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Invalid JSON for items"
      });
      return NEVER;
    }
  }),
  motivo: stringType().min(1),
  observacao: stringType().optional()
});
const load = async ({ request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const produtos = await db.produto.findMany({
      where: { empresaId },
      orderBy: { descricao: "asc" }
    });
    const movimentosRecentes = await db.movimentoEstoque.findMany({
      where: { empresaId },
      include: {
        produto: true,
        usuario: {
          select: {
            name: true
          }
        }
      },
      orderBy: { criadoEm: "desc" },
      take: 10
    });
    return serialize({
      produtos,
      movimentosRecentes
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return {
      produtos: [],
      movimentosRecentes: []
    };
  }
};
const actions = {
  registrarEntrada: async ({ request }) => {
    try {
      const empresaId = await getEmpresaId(request);
      const usuarioId = await getUserId(request);
      if (!usuarioId) {
        return fail(401, { error: "Usuário não autenticado" });
      }
      const formData = await request.formData();
      const data = {
        items: formData.get("items")?.toString() || "[]",
        motivo: formData.get("motivo")?.toString() || "",
        observacao: formData.get("observacao")?.toString()
      };
      const validatedData = entradaSchema.parse(data);
      if (validatedData.items.length === 0) {
        return fail(400, { error: "Nenhum item informado" });
      }
      await db.$transaction(async (tx) => {
        for (const item of validatedData.items) {
          const produto = await tx.produto.findFirst({
            where: {
              id: item.produtoId,
              empresaId
            }
          });
          if (!produto) {
            throw new Error(`Produto não encontrado: ${item.produtoId}`);
          }
          await tx.movimentoEstoque.create({
            data: {
              produtoId: item.produtoId,
              empresaId,
              usuarioId,
              tipo: "ENTRADA",
              quantidade: item.quantidade,
              motivo: validatedData.motivo,
              observacao: validatedData.observacao || null
            }
          });
          await tx.produto.update({
            where: { id: item.produtoId },
            data: {
              quantidade: produto.quantidade + item.quantidade
            }
          });
        }
      });
      return { success: true };
    } catch (error) {
      console.error("Erro ao registrar entrada:", error);
      if (error instanceof ZodError) {
        return fail(400, { error: "Dados inválidos", validationErrors: error.errors });
      }
      return fail(500, { error: error instanceof Error ? error.message : "Erro ao registrar entrada" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 55;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BPo8ZWTH.js')).default;
const server_id = "src/routes/(app)/estoque/entrada/+page.server.ts";
const imports = ["_app/immutable/nodes/55.pbfgXDRr.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/BWw0RkM7.js","_app/immutable/chunks/ByL5rCyh.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=55-DdM1upf1.js.map
