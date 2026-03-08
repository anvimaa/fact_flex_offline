import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { Decimal as Decimal$1 } from '@prisma/client/runtime/library';
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
import './utils-FiC4zhrQ.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

Decimal$1.set({ precision: 20, rounding: Decimal$1.ROUND_HALF_UP });
class FaturaGlobalService {
  docService = new DocumentoFiscalService();
  async criarFaturaGlobal(dados) {
    if (!dados.referenciasOrigem) {
      throw new Error("Fatura Global exige referências aos documentos de origem");
    }
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
        dados.empresaId,
        "FG",
        tx
      );
      const itensNormalizados = dados.itens.map((i) => ({
        quantidade: 1,
        precoUnitario: new Decimal$1(i.valorTotal),
        desconto: 0,
        taxa: i.taxa
      }));
      const { itensCalculados, resumo } = this.docService.calcularTotais(itensNormalizados);
      const obsPeriodo = `Período: ${dados.periodoInicio.toISOString().split("T")[0]} a ${dados.periodoFim.toISOString().split("T")[0]}`;
      const observacaoFinal = dados.observacao ? `${dados.observacao}
${obsPeriodo}
Ref: ${dados.referenciasOrigem}` : `${obsPeriodo}
Ref: ${dados.referenciasOrigem}`;
      const documento = await tx.documentoFiscal.create({
        data: {
          empresaId: dados.empresaId,
          clienteId: dados.clienteId,
          createdBy: dados.usuarioId,
          tipoDocumento: "FACTURA_GLOBAL",
          status: "EMITIDO",
          numero,
          serie: "FG",
          numeroSequencial,
          dataEmissao: dados.dataEmissao,
          dataVencimento: dados.dataVencimento,
          moeda: dados.moeda,
          subtotal: resumo.subtotal,
          totalDesconto: resumo.totalDesconto,
          totalImpostos: resumo.totalImpostos,
          total: resumo.total,
          observacao: observacaoFinal,
          referenciaOriginal: dados.referenciasOrigem,
          // Armazenado também aqui
          regimeFiscal: dados.regimeFiscal || "NORMAL",
          hashDocumento: this.docService.gerarHashDocumento({
            numero,
            dataEmissao: dados.dataEmissao,
            total: resumo.total.toFixed(2),
            periodo: obsPeriodo,
            empresaId: dados.empresaId,
            tipo: "FG"
          })
        }
      });
      for (const [index, item] of itensCalculados.entries()) {
        const itemOriginal = dados.itens[index];
        await tx.itemDocumento.create({
          data: {
            documentoId: documento.id,
            empresaId: dados.empresaId,
            // Produto genérico ou null
            codigo: `GLOBAL-${index + 1}`,
            descricao: itemOriginal.descricao,
            quantidade: 1,
            precoUnitario: item.precoUnitario,
            desconto: 0,
            taxa: item.taxa,
            subtotal: item.subtotal,
            total: item.total,
            motivoIsencao: itemOriginal.codigoTaxa
          }
        });
      }
      return documento;
    });
  }
}
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  const refs = url.searchParams.get("refs");
  const clienteId = url.searchParams.get("clienteId");
  const docIds = url.searchParams.get("docIds")?.split(",") || [];
  const subtotalReq = parseFloat(url.searchParams.get("subtotal") || "0");
  const impostosReq = parseFloat(url.searchParams.get("impostos") || "0");
  const totalReq = parseFloat(url.searchParams.get("total") || "0");
  let clienteSelecionado = null;
  if (clienteId) {
    clienteSelecionado = await db.cliente.findUnique({
      where: { id: clienteId }
    });
  }
  const documentosConsolidados = await db.documentoFiscal.findMany({
    where: {
      id: { in: docIds }
    },
    include: { itens: true }
  });
  const itensPorTaxa = {};
  documentosConsolidados.forEach((doc) => {
    doc.itens.forEach((item) => {
      const taxa = item.taxa.toNumber();
      if (!itensPorTaxa[taxa]) {
        itensPorTaxa[taxa] = {
          descricao: taxa === 0 ? "Vendas Isentas" : `Vendas Taxa ${taxa}%`,
          valorTotal: new Decimal(0),
          taxa
        };
      }
      const subtotal = item.precoUnitario.mul(item.quantidade);
      const desconto = item.descontoValor;
      itensPorTaxa[taxa].valorTotal = itensPorTaxa[taxa].valorTotal.add(subtotal).sub(desconto);
    });
  });
  const itensConsolidados = Object.values(itensPorTaxa).map((i) => ({
    ...i,
    valorTotal: i.valorTotal.toNumber()
  }));
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
    })),
    initialData: {
      start,
      end,
      refs,
      clienteId,
      clienteSelecionado,
      docIds,
      subtotal: subtotalReq,
      impostos: impostosReq,
      total: totalReq,
      itensConsolidados,
      documentosConsolidados: documentosConsolidados.map((doc) => ({
        ...doc,
        subtotal: doc.subtotal.toNumber(),
        totalDesconto: doc.totalDesconto.toNumber(),
        totalImpostos: doc.totalImpostos.toNumber(),
        total: doc.total.toNumber(),
        retencao: doc.retencao.toNumber(),
        itens: doc.itens.map((item) => ({
          ...item,
          precoUnitario: item.precoUnitario.toNumber(),
          desconto: item.desconto.toNumber(),
          descontoValor: item.descontoValor.toNumber(),
          taxa: item.taxa.toNumber(),
          taxaValor: item.taxaValor.toNumber(),
          subtotal: item.subtotal.toNumber(),
          total: item.total.toNumber()
        }))
      }))
    }
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
    const clienteId = formData.get("clienteId")?.toString();
    const dataEmissao = formData.get("dataEmissao")?.toString();
    const dataVencimento = formData.get("dataVencimento")?.toString();
    const periodoInicio = formData.get("periodoInicio")?.toString();
    const periodoFim = formData.get("periodoFim")?.toString();
    const referenciasOrigem = formData.get("referenciasOrigem")?.toString();
    const moeda = formData.get("moeda")?.toString();
    const observacao = formData.get("observacao")?.toString();
    const itensJSON = formData.get("itens")?.toString();
    if (!clienteId) {
      return fail(400, { error: "Cliente é obrigatório para Fatura Global" });
    }
    if (!dataEmissao || !dataVencimento) {
      return fail(400, { error: "Datas de emissão e vencimento são obrigatórias" });
    }
    if (!periodoInicio || !periodoFim) {
      return fail(400, { error: "O período de consolidação é obrigatório" });
    }
    if (!referenciasOrigem) {
      return fail(400, { error: "As referências aos documentos de origem são obrigatórias" });
    }
    if (!itensJSON) {
      return fail(400, { error: "É necessário ter itens consolidados" });
    }
    try {
      const itens = JSON.parse(itensJSON);
      if (!Array.isArray(itens) || itens.length === 0) {
        return fail(400, { error: "Nenhum item para consolidar" });
      }
      const docService = new FaturaGlobalService();
      const documento = await docService.criarFaturaGlobal({
        empresaId,
        clienteId,
        usuarioId,
        dataEmissao: new Date(dataEmissao),
        dataVencimento: new Date(dataVencimento),
        periodoInicio: new Date(periodoInicio),
        periodoFim: new Date(periodoFim),
        referenciasOrigem,
        moeda: moeda || "AOA",
        itens,
        observacao
      });
      return {
        success: true,
        message: "Fatura Global emitida com sucesso",
        documentoId: documento.id,
        numero: documento.numero
      };
    } catch (error) {
      console.error("Erro ao emitir fatura global:", error);
      return fail(500, { error: error.message || "Erro ao emitir documento" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 38;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DLOAq33J.js')).default;
const server_id = "src/routes/(app)/documentos/fatura-global/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/38.D7XVe1i5.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BAYmGL1H.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/Ch213L8M.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=38-CcQNvqfS.js.map
