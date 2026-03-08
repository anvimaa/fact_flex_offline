import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { c as calculateTotalDocumentoFiscal, a as calculateTotalItem } from './utils3-DjmiJAAD.js';
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

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const allowedTipos = /* @__PURE__ */ new Set(["FACTURA", "FACTURA_RECIBO"]);
  const ignoredStatus = /* @__PURE__ */ new Set(["ANULADO", "RASCUNHO", "REJEITADO_AGT"]);
  const now = /* @__PURE__ */ new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last12MonthsStart = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
  const allInvoices = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      dataEmissao: { gte: last12MonthsStart }
    },
    include: {
      itens: true,
      cliente: true
    },
    orderBy: { createdAt: "desc" }
  });
  const currentMonthInvoices = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status) && f.dataEmissao >= currentMonthStart
  );
  const currentMonthRevenue = calculateTotalDocumentoFiscal(currentMonthInvoices);
  const currentMonthCount = currentMonthInvoices.length;
  const currentAvgTicket = currentMonthCount > 0 ? currentMonthRevenue / currentMonthCount : 0;
  const lastMonthInvoices = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status) && f.dataEmissao >= lastMonthStart && f.dataEmissao < currentMonthStart
  );
  const lastMonthRevenue = calculateTotalDocumentoFiscal(lastMonthInvoices);
  const lastMonthCount = lastMonthInvoices.length;
  const lastAvgTicket = lastMonthCount > 0 ? lastMonthRevenue / lastMonthCount : 0;
  const revenueGrowth = lastMonthRevenue > 0 ? (currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100 : 0;
  const invoicesGrowth = lastMonthCount > 0 ? (currentMonthCount - lastMonthCount) / lastMonthCount * 100 : 0;
  const avgTicketGrowth = lastAvgTicket > 0 ? (currentAvgTicket - lastAvgTicket) / lastAvgTicket * 100 : 0;
  const revenueByMonth = [];
  const invoicesByMonth = [];
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthInvoices = allInvoices.filter(
      (f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status) && f.dataEmissao >= monthStart && f.dataEmissao < monthEnd
    );
    const monthTotal = calculateTotalDocumentoFiscal(monthInvoices);
    const monthName = monthStart.toLocaleDateString("pt-PT", { month: "short", year: "numeric" });
    revenueByMonth.push({
      mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      valor: monthTotal
    });
    invoicesByMonth.push({
      mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      quantidade: monthInvoices.length
    });
  }
  const totalClients = await db.cliente.count({ where: { empresaId } });
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const activeClientIds = new Set(
    allInvoices.filter((f) => f.dataEmissao >= threeMonthsAgo).map((f) => f.clienteId)
  );
  const activeClients = activeClientIds.size;
  const newClients = await db.cliente.count({
    where: {
      empresaId,
      createdAt: { gte: last30Days }
    }
  });
  const productSales = /* @__PURE__ */ new Map();
  allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status)).forEach((invoice) => {
    invoice.itens.forEach((item) => {
      const itemTotal = calculateTotalItem(item);
      if (productSales.has(item.descricao)) {
        const existing = productSales.get(item.descricao);
        existing.quantidade += item.quantidade;
        existing.receita += itemTotal;
        existing.vendas += 1;
        existing.margemMedia = (existing.margemMedia * (existing.vendas - 1) + (100 - item.desconto.toNumber())) / existing.vendas;
      } else {
        productSales.set(item.descricao, {
          nome: item.descricao,
          quantidade: item.quantidade,
          receita: itemTotal,
          margemMedia: item.desconto.sub(100).toNumber(),
          vendas: 1
        });
      }
    });
  });
  const productPerformance = Array.from(productSales.values()).sort((a, b) => b.receita - a.receita).slice(0, 10).map((p) => ({
    nome: p.nome,
    quantidade: p.quantidade,
    receita: p.receita,
    margemMedia: Number(p.margemMedia.toFixed(2))
  }));
  const paidInvoices = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && (f.status === "EMITIDO" || f.status === "VALIDADO_AGT")
  );
  const overdueInvoices = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && f.status === "ANULADO"
  );
  const pendingInvoices = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && (f.status === "RASCUNHO" || f.status === "PENDENTE_ENVIO")
  );
  const avgDaysToPayment = 15;
  const proformasIssued = allInvoices.filter(
    (f) => f.tipoDocumento === "FACTURA_PROFORMA" && f.dataEmissao >= currentMonthStart
  ).length;
  const proformasConverted = allInvoices.filter(
    (f) => allowedTipos.has(f.tipoDocumento) && f.referenciaOriginal && f.dataEmissao >= currentMonthStart
  ).length;
  const conversionRate = proformasIssued > 0 ? proformasConverted / proformasIssued * 100 : 0;
  const last3Months = revenueByMonth.slice(-3);
  const avgLast3Months = last3Months.reduce((sum, m) => sum + m.valor, 0) / 3;
  const salesForecast = [];
  for (let i = 1; i <= 3; i++) {
    const forecastMonth = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = forecastMonth.toLocaleDateString("pt-PT", {
      month: "short",
      year: "numeric"
    });
    const trend = revenueGrowth > 0 ? 1 + revenueGrowth / 100 : 1;
    const forecast = avgLast3Months * Math.pow(trend, i);
    salesForecast.push({
      mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      valorPrevisto: forecast
    });
  }
  return {
    performanceMetrics: {
      currentMonth: {
        revenue: currentMonthRevenue,
        invoices: currentMonthCount,
        avgTicket: currentAvgTicket
      },
      lastMonth: {
        revenue: lastMonthRevenue,
        invoices: lastMonthCount,
        avgTicket: lastAvgTicket
      },
      growth: {
        revenue: Number(revenueGrowth.toFixed(2)),
        invoices: Number(invoicesGrowth.toFixed(2)),
        avgTicket: Number(avgTicketGrowth.toFixed(2))
      }
    },
    revenueByMonth,
    invoicesByMonth,
    clientAnalysis: {
      total: totalClients,
      active: activeClients,
      inactive: totalClients - activeClients,
      new: newClients
    },
    productPerformance,
    paymentAnalysis: {
      onTime: paidInvoices.length,
      late: overdueInvoices.length,
      pending: pendingInvoices.length,
      avgDaysToPayment
    },
    salesForecast,
    conversionRate: {
      proformasIssued,
      proformasConverted,
      rate: Number(conversionRate.toFixed(2))
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BvRN76JZ.js')).default;
const server_id = "src/routes/(app)/analises/+page.server.ts";
const imports = ["_app/immutable/nodes/14.D-_YNT31.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BRKAVh4D.js","_app/immutable/chunks/DIYfOTad.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/YNjZNZoy.js","_app/immutable/chunks/Bft_5wgO.js","_app/immutable/chunks/Big5sRC4.js","_app/immutable/chunks/wHDnxFJm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-BJI7HOYv.js.map
