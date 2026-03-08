import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import './nota-debito.service-DVOnQCIQ.js';
import { L as LogService } from './log.service-DCmGal4h.js';
import { Decimal } from '@prisma/client/runtime/library';
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

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });
class NotaCreditoService {
  docService = new DocumentoFiscalService();
  logService = new LogService();
  /**
   * Emite uma nota de crédito para anular/rectificar uma factura
   */
  async emitirNotaCredito(params) {
    const { facturaId, motivo, itensParaCreditar, provaAceitacao, usuarioId } = params;
    const factura = await db.documentoFiscal.findUnique({
      where: { id: facturaId },
      include: { itens: true, empresa: true, cliente: true }
    });
    if (!factura) {
      throw new Error("Factura não encontrada");
    }
    if (!["FACTURA", "FACTURA_RECIBO"].includes(factura.tipoDocumento)) {
      throw new Error("Apenas facturas ou facturas-recibo podem gerar notas de crédito");
    }
    if (factura.status === "ANULADO") {
      throw new Error("Factura já está anulada");
    }
    if (factura.status === "RASCUNHO") {
      throw new Error("Não é possível creditar facturas em rascunho");
    }
    return await db.$transaction(
      async (tx) => {
        const itensValidos = factura.itens.filter(
          (item) => itensParaCreditar.some((ic) => ic.itemId === item.id)
        );
        if (itensValidos.length !== itensParaCreditar.length) {
          throw new Error("Alguns itens não pertencem à factura");
        }
        const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
          factura.empresaId,
          "NC",
          tx
        );
        let subtotal = new Decimal(0);
        let totalImpostos = new Decimal(0);
        const itensNota = itensParaCreditar.map((ic) => {
          const itemOriginal = factura.itens.find((i) => i.id === ic.itemId);
          const priceOriginal = new Decimal(itemOriginal.precoUnitario);
          const discountOriginal = new Decimal(ic.descontoOriginal ?? itemOriginal.desconto ?? 0);
          const fatorDesconto = new Decimal(1).sub(discountOriginal.div(100));
          const precoUnitarioLiquido = priceOriginal.mul(fatorDesconto);
          const qtyCreditar = new Decimal(ic.quantidade);
          const subtotalItem = precoUnitarioLiquido.mul(qtyCreditar);
          const taxaValor = subtotalItem.mul(new Decimal(itemOriginal.taxa).div(100));
          const totalItem = subtotalItem.add(taxaValor);
          subtotal = subtotal.add(subtotalItem);
          totalImpostos = totalImpostos.add(taxaValor);
          return {
            codigo: itemOriginal.codigo,
            descricao: `CRÉDITO: ${itemOriginal.descricao}`,
            quantidade: ic.quantidade,
            unidade: itemOriginal.unidade,
            precoUnitario: precoUnitarioLiquido.toNumber(),
            desconto: 0,
            descontoValor: 0,
            taxa: itemOriginal.taxa,
            taxaValor: taxaValor.toNumber(),
            subtotal: subtotalItem.toNumber(),
            total: totalItem.toNumber(),
            produtoId: itemOriginal.produtoId,
            empresaId: factura.empresaId,
            motivoIsencao: itemOriginal.motivoIsencao
          };
        });
        const total = subtotal.add(totalImpostos);
        const somaTotalLinhas = itensNota.reduce((sum, item) => sum.add(new Decimal(item.total)), new Decimal(0));
        if (!total.eq(somaTotalLinhas)) {
          throw new Error(`Anomalia detectada: Total do documento (${total}) diverge da soma das linhas (${somaTotalLinhas})`);
        }
        const notaCredito = await tx.documentoFiscal.create({
          data: {
            tipoDocumento: "NOTA_CREDITO",
            numero,
            serie: "NC",
            numeroSequencial,
            dataEmissao: /* @__PURE__ */ new Date(),
            dataOperacao: /* @__PURE__ */ new Date(),
            empresaId: factura.empresaId,
            clienteId: factura.clienteId,
            moeda: factura.moeda,
            subtotal,
            totalDesconto: 0,
            totalImpostos,
            total,
            retencao: 0,
            observacao: `Nota de crédito referente à ${factura.numero}`,
            motivoEmissao: motivo,
            referenciaOriginal: factura.numero,
            documentoOriginalId: factura.id,
            status: "EMITIDO",
            estado: "finalizado",
            regimeFiscal: factura.regimeFiscal,
            provaAceitacao: provaAceitacao?.arquivo,
            tipoProva: provaAceitacao?.tipo,
            createdBy: usuarioId,
            itens: {
              create: itensNota
            }
          },
          include: { itens: true }
        });
        const hash = this.docService.gerarHashDocumento(notaCredito);
        await tx.documentoFiscal.update({
          where: { id: notaCredito.id },
          data: { hashDocumento: hash }
        });
        const statusFactura = total.gte(new Decimal(factura.total)) ? "ANULADO" : "RECTIFICADO";
        await tx.documentoFiscal.update({
          where: { id: factura.id },
          data: { status: statusFactura, motivoEmissao: motivo }
        });
        await this.logService.registrarLog(tx, {
          documentoId: notaCredito.id,
          acao: "CRIADO",
          descricao: `Nota de crédito emitida para ${factura.numero}`,
          usuarioId,
          dadosNovos: JSON.stringify({ motivo, total, itens: itensNota.length })
        });
        await this.logService.registrarLog(tx, {
          documentoId: factura.id,
          acao: statusFactura,
          descricao: `Factura ${statusFactura.toLowerCase()} por nota de crédito ${numero}`,
          usuarioId,
          dadosNovos: JSON.stringify({ notaCreditoId: notaCredito.id, valor: total })
        });
        return notaCredito;
      },
      {
        maxWait: 2e4,
        // 20s
        timeout: 6e4
        // 60s
      }
    );
  }
  /**
   * Lista notas de crédito de uma factura
   */
  async listarNotasCredito(facturaId) {
    return await db.documentoFiscal.findMany({
      where: {
        documentoOriginalId: facturaId,
        tipoDocumento: "NOTA_CREDITO"
      },
      include: {
        itens: true,
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { dataEmissao: "desc" }
    });
  }
  /**
   * Calcula valor total já creditado de uma factura
   */
  async calcularTotalCreditado(facturaId) {
    const notasCredito = await this.listarNotasCredito(facturaId);
    const total = notasCredito.reduce((sum, nc) => sum.add(new Decimal(nc.total)), new Decimal(0));
    return total.toNumber();
  }
}
const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const facturaId = url.searchParams.get("factura");
  const facturas = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: {
        in: ["FACTURA", "FACTURA_RECIBO"]
      },
      status: {
        notIn: ["RASCUNHO", "ANULADO"]
      }
    },
    include: {
      cliente: true,
      itens: {
        include: {
          produto: true
        }
      }
    },
    orderBy: { dataEmissao: "desc" },
    take: 50
  });
  let facturaSelecionada = null;
  if (facturaId) {
    facturaSelecionada = await db.documentoFiscal.findUnique({
      where: { id: facturaId },
      include: {
        cliente: true,
        itens: {
          include: {
            produto: true
          }
        }
      }
    });
  }
  const serializeDoc = (doc) => ({
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
      total: item.total.toNumber(),
      produto: item.produto ? {
        ...item.produto,
        precoUnitario: item.produto.precoUnitario.toNumber(),
        desconto: item.produto.desconto.toNumber()
      } : null
    }))
  });
  return {
    facturas: facturas.map(serializeDoc),
    facturaSelecionada: facturaSelecionada ? serializeDoc(facturaSelecionada) : null
  };
};
const actions = {
  emitir: async ({ request }) => {
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    const data = await request.formData();
    const facturaId = data.get("facturaId")?.toString();
    const motivo = data.get("motivo")?.toString();
    const itensJSON = data.get("itens")?.toString();
    if (!facturaId) {
      return fail(400, { error: "Factura é obrigatória" });
    }
    if (!motivo) {
      return fail(400, { error: "Motivo é obrigatório" });
    }
    if (!itensJSON) {
      return fail(400, { error: "Selecione pelo menos um item para creditar" });
    }
    try {
      const itensParaCreditar = JSON.parse(itensJSON);
      if (!Array.isArray(itensParaCreditar) || itensParaCreditar.length === 0) {
        return fail(400, { error: "Selecione pelo menos um item para creditar" });
      }
      const notaCreditoService = new NotaCreditoService();
      const notaCredito = await notaCreditoService.emitirNotaCredito({
        facturaId,
        motivo,
        itensParaCreditar,
        usuarioId
      });
      return {
        success: true,
        message: "Nota de crédito emitida com sucesso",
        notaCreditoId: notaCredito.id,
        numero: notaCredito.numero
      };
    } catch (error) {
      console.error("Erro ao emitir nota de crédito:", error);
      return fail(500, { error: error.message || "Erro ao emitir nota de crédito" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 46;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DSv8SG4j.js')).default;
const server_id = "src/routes/(app)/documentos/notas-credito/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/46.D_Cf4IKB.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/DjgbYm18.js","_app/immutable/chunks/Ch213L8M.js","_app/immutable/chunks/DEny8yli.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/D-B4xN_o.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/DPGXPgrH.js","_app/immutable/chunks/BjnueqJj.js","_app/immutable/chunks/CrnxsNcH.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/a4dh2IS1.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/57zjA3Wr.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/dSyDDdoo.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=46-DfituAyX.js.map
