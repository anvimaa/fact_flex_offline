import { f as fail, e as error } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { F as FaturaReciboService } from './fatura-recibo.service-C7NRnvyz.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
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
import './documento-fiscal.service-B72KZQqg.js';
import '@prisma/client/runtime/library';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const load = async ({ params, request }) => {
  try {
    const empresaId = await getEmpresaId(request);
    const vendaId = params.id;
    if (!vendaId) {
      throw error(400, "ID da venda não fornecido");
    }
    const venda = await db.venda.findFirst({
      where: {
        id: vendaId,
        empresaId
      },
      include: {
        cliente: true,
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        itens: {
          include: {
            produto: {
              include: {
                taxa: true
              }
            }
          }
        }
      }
    });
    if (!venda) {
      throw error(404, "Venda não encontrada");
    }
    return serialize({
      venda
    });
  } catch (err) {
    console.error("Erro ao carregar venda:", err);
    if (err instanceof Error && "status" in err) {
      throw err;
    }
    throw error(500, "Erro ao carregar detalhes da venda");
  }
};
const actions = {
  emitirFatura: async ({ params, request }) => {
    try {
      const empresaId = await getEmpresaId(request);
      const vendaId = params.id;
      if (!vendaId) {
        return fail(400, { error: "ID da venda não fornecido" });
      }
      const venda = await db.venda.findFirst({
        where: {
          id: vendaId,
          empresaId
        },
        include: {
          itens: {
            include: {
              produto: {
                include: {
                  taxa: true
                }
              }
            }
          },
          cliente: true
        }
      });
      if (!venda) {
        return fail(404, { error: "Venda não encontrada" });
      }
      if (venda.status !== "FINALIZADA") {
        return fail(400, { error: "Apenas vendas finalizadas podem ser transformadas em fatura" });
      }
      const existingFactura = await db.documentoFiscal.findFirst({
        where: {
          empresaId,
          referenciaOriginal: venda.codigo,
          tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
          status: {
            not: "ANULADO"
          }
        }
      });
      if (existingFactura) {
        return fail(400, {
          error: `Já existe uma factura (${existingFactura.numero}) para esta venda`
        });
      }
      const usuarioId = await getUserId(request);
      if (!usuarioId) {
        return fail(401, { error: "Usuário não autenticado" });
      }
      const docService = new FaturaReciboService();
      const itens = venda.itens.map((item) => ({
        produtoId: item.produtoId,
        codigo: item.produto.codigo,
        descricao: item.produto.descricao,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
        desconto: item.desconto || 0,
        taxa: item.produto.taxa?.valor || 0,
        total: item.total,
        motivosIsencao: item.produto.motivoIsento || ""
      }));
      if (!venda.clienteId) {
        return fail(400, { error: "A venda deve ter um cliente associado para emitir factura" });
      }
      const documento = await docService.criarFaturaRecibo({
        empresaId,
        clienteId: venda.clienteId,
        usuarioId,
        dataEmissao: /* @__PURE__ */ new Date(),
        dataVencimento: /* @__PURE__ */ new Date(),
        // Venda a pronto pagamento
        moeda: "AOA",
        // Default
        itens,
        observacao: `Referente à Venda ${venda.codigo}`,
        referenciaOriginal: venda.codigo,
        formaPagamento: "NUMERARIO"
        // Default, idealmente viria da venda
      });
      await db.venda.update({
        where: { id: params.id },
        data: { facturaRef: documento.numero, status: "FACTURADO", facturaId: documento.id }
      });
      return {
        success: true,
        faturaId: documento.id,
        numero: documento.numero
      };
    } catch (err) {
      console.error("Erro ao transformar venda em fatura:", err);
      return fail(500, { error: "Erro ao criar fatura" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 59;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-bGSGmtWD.js')).default;
const server_id = "src/routes/(app)/venda/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/59.EPtjYfxg.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/BoQmdQ5C.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/uhbZFQfB.js","_app/immutable/chunks/DNjCieoT.js","_app/immutable/chunks/DsTWAe0h.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/DIYfOTad.js","_app/immutable/chunks/Biz73Bsi.js","_app/immutable/chunks/Cf6qd43C.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css","_app/immutable/assets/59.Qp_mZdq3.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=59-CANqwl0m.js.map
