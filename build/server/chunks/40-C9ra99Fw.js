import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { F as FaturaReciboService } from './fatura-recibo.service-C7NRnvyz.js';
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

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const clientes = await db.cliente.findMany({
    where: { empresaId },
    orderBy: { nome: "asc" }
  });
  const produtos = await db.produto.findMany({
    where: { empresaId },
    orderBy: { descricao: "asc" },
    include: { taxa: true }
  });
  return {
    clientes,
    produtos: produtos.map((p) => ({
      ...p,
      precoUnitario: p.precoUnitario.toNumber(),
      desconto: p.desconto.toNumber(),
      taxa: p.taxa ? { ...p.taxa, valor: p.taxa.valor.toNumber() } : null
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
    const dataEmissao = data.get("dataEmissao")?.toString();
    const dataVencimento = data.get("dataVencimento")?.toString();
    const moeda = data.get("moeda")?.toString();
    const observacao = data.get("observacao")?.toString();
    const formaPagamento = data.get("formaPagamento")?.toString();
    const retencao = Number(data.get("retencao") || 0);
    const itensJSON = data.get("itens")?.toString();
    if (!clienteId || !dataEmissao || !dataVencimento || !moeda || !itensJSON || !formaPagamento) {
      return fail(400, { error: "Campos obrigatórios faltando (incluindo pagamento)" });
    }
    try {
      const itens = JSON.parse(itensJSON);
      if (!Array.isArray(itens) || itens.length === 0) {
        return fail(400, { error: "Adicione pelo menos um item" });
      }
      const docService = new FaturaReciboService();
      const documento = await docService.criarFaturaRecibo({
        empresaId,
        clienteId,
        usuarioId,
        dataEmissao: new Date(dataEmissao),
        dataVencimento: new Date(dataVencimento),
        moeda,
        itens,
        observacao,
        formaPagamento,
        retencao
      });
      return {
        success: true,
        message: "Fatura-Recibo emitida com sucesso",
        documentoId: documento.id,
        numero: documento.numero
      };
    } catch (error) {
      console.error("Erro ao emitir fatura-recibo:", error);
      return fail(500, { error: error.message || "Erro ao emitir documento" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 40;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DboTPf4i.js')).default;
const server_id = "src/routes/(app)/documentos/fatura-recibo/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/40.CXMTk6P6.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/CQ4QMds4.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BAYmGL1H.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/BMqQavlV.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/BR84ViWi.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/rElBzkBk.js","_app/immutable/chunks/lb-VZtDC.js","_app/immutable/chunks/C3L2ZEEU.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/ByL5rCyh.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=40-C9ra99Fw.js.map
