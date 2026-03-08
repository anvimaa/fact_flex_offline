import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { N as NotaDebitoService } from './nota-debito.service-DVOnQCIQ.js';
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
import './utils-FiC4zhrQ.js';
import './documento-fiscal.service-B72KZQqg.js';
import '@prisma/client/runtime/library';
import './log.service-DCmGal4h.js';

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const clientes = await db.cliente.findMany({
    where: { empresaId },
    orderBy: { nome: "asc" }
  });
  const facturas = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: "FACTURA",
      status: {
        in: ["EMITIDO", "VALIDADO_AGT"]
      }
    },
    include: {
      cliente: true
    },
    orderBy: { dataEmissao: "desc" },
    take: 50
  });
  return {
    clientes,
    facturas: facturas.map((doc) => ({
      ...doc,
      subtotal: doc.subtotal.toNumber(),
      totalDesconto: doc.totalDesconto.toNumber(),
      totalImpostos: doc.totalImpostos.toNumber(),
      total: doc.total.toNumber(),
      retencao: doc.retencao.toNumber()
    }))
  };
};
const actions = {
  emitir: async ({ request }) => {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    const data = await request.formData();
    const clienteId = data.get("clienteId")?.toString();
    const facturaId = data.get("facturaId")?.toString() || void 0;
    const motivo = data.get("motivo")?.toString();
    const observacao = data.get("observacao")?.toString();
    const itensJSON = data.get("itens")?.toString();
    if (!clienteId) {
      return fail(400, { error: "Cliente é obrigatório" });
    }
    if (!motivo) {
      return fail(400, { error: "Motivo é obrigatório" });
    }
    if (!itensJSON) {
      return fail(400, { error: "Adicione pelo menos um item" });
    }
    try {
      const itens = JSON.parse(itensJSON);
      if (!Array.isArray(itens) || itens.length === 0) {
        return fail(400, { error: "Adicione pelo menos um item" });
      }
      const notaDebitoService = new NotaDebitoService();
      const notaDebito = await notaDebitoService.emitirNotaDebito({
        empresaId,
        clienteId,
        facturaId,
        motivo,
        itens,
        observacao,
        usuarioId
      });
      return {
        success: true,
        message: "Nota de débito emitida com sucesso",
        notaDebitoId: notaDebito.id,
        numero: notaDebito.numero
      };
    } catch (error) {
      console.error("Erro ao emitir nota de débito:", error);
      return fail(500, { error: error.message || "Erro ao emitir nota de débito" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 47;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B6bSAeR4.js')).default;
const server_id = "src/routes/(app)/documentos/notas-debito/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/47.DtEpiox8.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/ByL5rCyh.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=47-p7FdQAeJ.js.map
