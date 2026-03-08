import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { D as Decimal } from './utils3-DjmiJAAD.js';
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
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
const load = async ({ request, url }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const categoriaId = url.searchParams.get("categoria");
    const fornecedorId = url.searchParams.get("fornecedor");
    const semEstoque = url.searchParams.get("semEstoque") === "true";
    const estoqueBaixo = url.searchParams.get("estoqueBaixo") === "true";
    const where = { empresaId };
    if (categoriaId) {
      where.categoriaId = categoriaId;
    }
    if (fornecedorId) {
      where.fornecedorId = fornecedorId;
    }
    if (semEstoque) {
      where.quantidade = 0;
    } else if (estoqueBaixo) {
      where.quantidade = { gt: 0, lte: 50 };
    }
    const produtos = await db.produto.findMany({
      where,
      include: {
        categoria: true,
        fornecedor: true,
        taxa: true
      },
      orderBy: { descricao: "asc" }
    });
    const [categorias, fornecedores] = await Promise.all([
      db.categoria.findMany({
        where: { empresaId },
        orderBy: { nome: "asc" }
      }),
      db.fornecedor.findMany({
        where: { empresaId },
        orderBy: { nome: "asc" }
      })
    ]);
    const totalProdutos = produtos.length;
    const produtosSemEstoque = produtos.filter((p) => p.quantidade <= 0).length;
    const produtosEstoqueBaixo = produtos.filter(
      (p) => p.quantidade > 0 && p.quantidade <= 50
    ).length;
    const valorTotalEstoque = produtos.reduce(
      (acc, p) => acc.add(new Decimal(p.quantidade).mul(new Decimal(p.precoUnitario))),
      new Decimal(0)
    );
    return {
      produtos: produtos.map((p) => ({
        ...p,
        precoUnitario: p.precoUnitario.toNumber(),
        desconto: p.desconto.toNumber(),
        taxa: p.taxa ? { ...p.taxa, valor: p.taxa.valor.toNumber() } : null
      })),
      categorias,
      fornecedores,
      estatisticas: {
        totalProdutos,
        produtosSemEstoque,
        produtosEstoqueBaixo,
        valorTotalEstoque: valorTotalEstoque.toNumber()
      }
    };
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
    return {
      produtos: [],
      categorias: [],
      fornecedores: [],
      estatisticas: {
        totalProdutos: 0,
        produtosSemEstoque: 0,
        produtosEstoqueBaixo: 0,
        valorTotalEstoque: 0
      }
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 54;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CoUFq19Z.js')).default;
const server_id = "src/routes/(app)/estoque/+page.server.ts";
const imports = ["_app/immutable/nodes/54.D_WlUkHz.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/Di22MuPF.js","_app/immutable/chunks/DIYfOTad.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=54-DzA2DBra.js.map
