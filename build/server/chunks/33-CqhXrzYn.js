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
const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  if (!empresaId) {
    return {
      stats: {
        faturasEmitidas: { valor: 0, crescimento: 0, subTexto: "nos últimos 30 dias" },
        valorFaturado: { valor: 0, crescimento: 0, subTexto: "este mês" },
        proformasConvertidas: { valor: 0, crescimento: 0, subTexto: "taxa de conversão" },
        receitaProjetada: { valor: 0, crescimento: 0, subTexto: "baseado em proformas" }
      },
      dadosGrafico: [],
      ultimasOperacoes: []
    };
  }
  const now = /* @__PURE__ */ new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
  const previous30Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3);
  const [currentInvoiceCount, previousInvoiceCount] = await Promise.all([
    db.documentoFiscal.count({
      where: {
        empresaId,
        tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
        dataEmissao: { gte: last30Days }
      }
    }),
    db.documentoFiscal.count({
      where: {
        empresaId,
        tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
        dataEmissao: { gte: previous30Days, lt: last30Days }
      }
    })
  ]);
  const invoiceGrowth = previousInvoiceCount > 0 ? (currentInvoiceCount - previousInvoiceCount) / previousInvoiceCount * 100 : 0;
  const currentMonthInvoices = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
      status: { notIn: ["ANULADO", "RASCUNHO", "REJEITADO_AGT"] },
      dataEmissao: { gte: currentMonth }
    },
    include: { itens: true }
  });
  const lastMonthInvoices = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
      status: { notIn: ["ANULADO", "RASCUNHO", "REJEITADO_AGT"] },
      dataEmissao: { gte: lastMonth, lt: currentMonth }
    },
    include: { itens: true }
  });
  const calculateTotal = (invoices) => {
    return invoices.reduce((total, factura) => {
      const facturaTotal = factura.itens.reduce((sum, item) => {
        const precoUnitario = new Decimal(item.precoUnitario);
        const subtotal = precoUnitario.mul(item.quantidade);
        const discount = subtotal.mul(new Decimal(item.desconto || 0).div(100));
        const afterDiscount = subtotal.sub(discount);
        const tax = afterDiscount.mul(new Decimal(item.taxa || 0).div(100));
        return sum + afterDiscount.add(tax).toNumber();
      }, 0);
      return total + facturaTotal;
    }, 0);
  };
  const currentRevenue = calculateTotal(currentMonthInvoices);
  const lastRevenue = calculateTotal(lastMonthInvoices);
  const revenueGrowth = lastRevenue > 0 ? (currentRevenue - lastRevenue) / lastRevenue * 100 : 0;
  const currentProformas = await db.documentoFiscal.count({
    where: {
      empresaId,
      tipoDocumento: "FACTURA_PROFORMA",
      dataEmissao: { gte: currentMonth }
    }
  });
  const convertedProformas = await db.documentoFiscal.count({
    where: {
      empresaId,
      tipoDocumento: "FACTURA",
      referenciaOriginal: { not: null },
      dataEmissao: { gte: currentMonth }
    }
  });
  const lastMonthProformas = await db.documentoFiscal.count({
    where: {
      empresaId,
      tipoDocumento: "FACTURA_PROFORMA",
      dataEmissao: { gte: lastMonth, lt: currentMonth }
    }
  });
  const lastMonthConverted = await db.documentoFiscal.count({
    where: {
      empresaId,
      tipoDocumento: "FACTURA",
      referenciaOriginal: { not: null },
      dataEmissao: { gte: lastMonth, lt: currentMonth }
    }
  });
  const currentConversionRate = currentProformas > 0 ? convertedProformas / currentProformas * 100 : 0;
  const lastConversionRate = lastMonthProformas > 0 ? lastMonthConverted / lastMonthProformas * 100 : 0;
  const conversionGrowth = lastConversionRate > 0 ? currentConversionRate - lastConversionRate : 0;
  const pendingProformas = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: "FACTURA_PROFORMA",
      status: { in: ["RASCUNHO"] }
    },
    include: { itens: true }
  });
  const projectedRevenue = calculateTotal(pendingProformas);
  const lastMonthPendingProformas = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      tipoDocumento: "FACTURA_PROFORMA",
      status: { in: ["RASCUNHO"] },
      dataEmissao: { gte: lastMonth, lt: currentMonth }
    },
    include: { itens: true }
  });
  const lastProjectedRevenue = calculateTotal(lastMonthPendingProformas);
  const projectedGrowth = lastProjectedRevenue > 0 ? (projectedRevenue - lastProjectedRevenue) / lastProjectedRevenue * 100 : 0;
  const monthlyData = [];
  for (let i = 4; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthInvoices = await db.documentoFiscal.findMany({
      where: {
        empresaId,
        tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] },
        status: { notIn: ["ANULADO", "RASCUNHO", "REJEITADO_AGT"] },
        dataEmissao: { gte: monthStart, lt: monthEnd }
      },
      include: { itens: true }
    });
    const monthTotal = calculateTotal(monthInvoices);
    const monthName = monthStart.toLocaleDateString("pt-PT", { month: "short" });
    monthlyData.push({
      mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      valor: monthTotal
    });
  }
  const recentDocs = await db.documentoFiscal.findMany({
    where: { empresaId },
    include: {
      cliente: true,
      itens: true
    },
    orderBy: { createdAt: "desc" },
    take: 3
  });
  const ultimasOperacoes = recentDocs.map((doc) => {
    const total = calculateTotal([doc]);
    return {
      id: doc.id,
      tipo: doc.tipoDocumento === "FACTURA" ? "Fatura" : doc.tipoDocumento === "RECIBO" ? "Recibo" : doc.tipoDocumento === "NOTA_CREDITO" ? "Nota de Crédito" : doc.tipoDocumento === "NOTA_DEBITO" ? "Nota de Débito" : doc.tipoDocumento === "GUIA_REMESSA" ? "Guia de Remessa" : "Pro-forma",
      valor: total,
      status: doc.status === "EMITIDO" ? "Finalizado" : doc.status === "ANULADO" ? "Anulado" : "Rascunho",
      data: doc.dataEmissao.toISOString(),
      cliente: doc.cliente?.nome
    };
  });
  return {
    stats: {
      faturasEmitidas: {
        valor: currentInvoiceCount,
        crescimento: Number(invoiceGrowth.toFixed(1)),
        subTexto: "nos últimos 30 dias"
      },
      valorFaturado: {
        valor: currentRevenue,
        crescimento: Number(revenueGrowth.toFixed(1)),
        subTexto: "este mês"
      },
      proformasConvertidas: {
        valor: Number(currentConversionRate.toFixed(1)),
        crescimento: Number(conversionGrowth.toFixed(1)),
        subTexto: "taxa de conversão"
      },
      receitaProjetada: {
        valor: projectedRevenue,
        crescimento: Number(projectedGrowth.toFixed(1)),
        subTexto: "baseado em proformas"
      }
    },
    dadosGrafico: monthlyData,
    ultimasOperacoes
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 33;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-QPUv3Dw8.js')).default;
const server_id = "src/routes/(app)/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/33.CXsiho4j.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Bft_5wgO.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/Cf6qd43C.js","_app/immutable/chunks/BMqQavlV.js","_app/immutable/chunks/Biz73Bsi.js","_app/immutable/chunks/DIYfOTad.js","_app/immutable/chunks/wHDnxFJm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=33-CqhXrzYn.js.map
