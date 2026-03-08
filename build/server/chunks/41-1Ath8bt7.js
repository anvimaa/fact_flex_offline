import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
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
import '@prisma/client/runtime/library';

class FaturaSimplificadaService {
  docService = new DocumentoFiscalService();
  async criarFaturaSimplificada(dados) {
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
        dados.empresaId,
        "FT",
        tx
      );
      const { itensCalculados, resumo } = this.docService.calcularTotais(dados.itens);
      const documento = await tx.documentoFiscal.create({
        data: {
          empresaId: dados.empresaId,
          clienteId: dados.clienteId || null,
          createdBy: dados.usuarioId,
          tipoDocumento: "FACTURA",
          status: "EMITIDO",
          numero,
          serie: "FT",
          numeroSequencial,
          dataEmissao: dados.dataEmissao,
          dataVencimento: dados.dataVencimento,
          moeda: dados.moeda,
          subtotal: resumo.subtotal,
          totalDesconto: resumo.totalDesconto,
          totalImpostos: resumo.totalImpostos,
          total: resumo.total,
          observacao: dados.observacao,
          formaPagamento: dados.formaPagamento,
          referenciaOriginal: dados.referenciaOriginal,
          regimeFiscal: dados.regimeFiscal || "NORMAL",
          hashDocumento: this.docService.gerarHashDocumento({
            numero,
            dataEmissao: dados.dataEmissao,
            total: resumo.total.toFixed(2),
            empresaId: dados.empresaId,
            tipo: "FT"
          })
        }
      });
      for (const item of itensCalculados) {
        await tx.itemDocumento.create({
          data: {
            documentoId: documento.id,
            empresaId: dados.empresaId,
            produtoId: item.produtoId,
            codigo: item.codigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            desconto: item.desconto || 0,
            descontoValor: item.descontoValor || 0,
            taxa: item.taxa || 0,
            taxaValor: item.taxaValor || 0,
            subtotal: item.subtotal,
            total: item.total,
            motivoIsencao: item.motivoIsencao
          }
        });
        if (item.produtoId) {
          await tx.movimentoEstoque.create({
            data: {
              empresaId: dados.empresaId,
              produtoId: item.produtoId,
              usuarioId: dados.usuarioId,
              tipo: "SAIDA",
              quantidade: item.quantidade,
              motivo: "VENDA",
              observacao: `Fatura Simplificada ${numero}`
            }
          });
          await tx.produto.update({
            where: { id: item.produtoId },
            data: {
              quantidade: {
                decrement: item.quantidade
              }
            }
          });
        }
      }
      return documento;
    });
  }
}
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
    const formData = await request.formData();
    const clienteId = formData.get("clienteId")?.toString() || void 0;
    const moeda = formData.get("moeda")?.toString() || "AOA";
    const itensJSON = formData.get("itens")?.toString();
    if (!itensJSON) {
      return fail(400, { error: "Adicione pelo menos um item" });
    }
    try {
      const itens = JSON.parse(itensJSON);
      if (!Array.isArray(itens) || itens.length === 0) {
        return fail(400, { error: "Adicione pelo menos um item" });
      }
      for (const item of itens) {
        if (!item.descricao || item.quantidade <= 0 || item.precoUnitario < 0) {
          return fail(400, { error: "Todos os itens devem ter descrição, quantidade e preço válidos" });
        }
      }
      const docService = new FaturaSimplificadaService();
      const documento = await docService.criarFaturaSimplificada({
        empresaId,
        clienteId,
        // Pode ser undefined = Consumidor Final
        usuarioId,
        dataEmissao: /* @__PURE__ */ new Date(),
        dataVencimento: /* @__PURE__ */ new Date(),
        // Pronto pagamento
        moeda,
        itens: itens.map((i) => ({
          produtoId: i.produtoId || null,
          codigo: i.produtoId ? `PROD-${i.produtoId.slice(0, 8)}` : "ITEM",
          descricao: i.descricao,
          quantidade: Number(i.quantidade),
          precoUnitario: Number(i.precoUnitario),
          desconto: 0,
          taxa: Number(i.taxa || i.valorTaxa || 14),
          unidade: "UN"
        })),
        observacao: "Fatura Simplificada - Venda ao Consumidor",
        formaPagamento: "NU"
        // Numerário por defeito
      });
      return {
        success: true,
        message: "Fatura Simplificada emitida com sucesso",
        documentoId: documento.id,
        numero: documento.numero
      };
    } catch (error) {
      console.error("Erro ao emitir fatura simplificada:", error);
      return fail(500, { error: error.message || "Erro ao emitir documento" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 41;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BJs9_-YC.js')).default;
const server_id = "src/routes/(app)/documentos/fatura-simplificada/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/41.DRzStWYh.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BAYmGL1H.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/Cf6qd43C.js","_app/immutable/chunks/C3L2ZEEU.js","_app/immutable/chunks/ByL5rCyh.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=41-1Ath8bt7.js.map
