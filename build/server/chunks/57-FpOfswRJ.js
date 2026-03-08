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
  if (!empresaId) {
    return {
      totalInvoices: 0,
      totalRevenue: 0,
      totalClients: 0,
      totalProducts: 0,
      monthlyRevenue: [],
      invoicesByStatus: [],
      topClients: [],
      topProducts: [],
      recentInvoices: []
    };
  }
  const now = /* @__PURE__ */ new Date();
  const currentYear = now.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const allInvoices = await db.documentoFiscal.findMany({
    where: {
      empresaId,
      dataEmissao: { gte: startOfYear },
      tipoDocumento: { in: ["FACTURA", "FACTURA_RECIBO"] }
    },
    include: {
      itens: true,
      cliente: true
    },
    orderBy: { dataEmissao: "desc" }
  });
  const totalInvoices = allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento)).length;
  const totalRevenue = calculateTotalDocumentoFiscal(
    allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status))
  );
  const totalClients = await db.cliente.count({
    where: { empresaId }
  });
  const totalProducts = await db.produto.count({
    where: { empresaId }
  });
  const monthlyRevenue = [];
  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthInvoices = allInvoices.filter(
      (f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status) && f.dataEmissao >= monthStart && f.dataEmissao < monthEnd
    );
    const monthTotal = calculateTotalDocumentoFiscal(monthInvoices);
    const monthName = monthStart.toLocaleDateString("pt-PT", { month: "short", year: "2-digit" });
    monthlyRevenue.push({
      mes: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      valor: monthTotal,
      quantidade: monthInvoices.length
    });
  }
  const invoicesByStatus = [
    {
      status: "Finalizada",
      quantidade: allInvoices.filter(
        (f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status)
      ).length,
      valor: calculateTotalDocumentoFiscal(
        allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status))
      )
    },
    {
      status: "Rascunho",
      quantidade: allInvoices.filter(
        (f) => allowedTipos.has(f.tipoDocumento) && f.status === "RASCUNHO"
      ).length,
      valor: calculateTotalDocumentoFiscal(
        allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && f.status === "RASCUNHO")
      )
    },
    {
      status: "Anulado",
      quantidade: allInvoices.filter(
        (f) => allowedTipos.has(f.tipoDocumento) && f.status === "ANULADO"
      ).length,
      valor: calculateTotalDocumentoFiscal(
        allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && f.status === "ANULADO")
      )
    },
    {
      status: "Rectificado",
      quantidade: allInvoices.filter(
        (f) => allowedTipos.has(f.tipoDocumento) && f.status === "RECTIFICADO"
      ).length,
      valor: calculateTotalDocumentoFiscal(
        allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && f.status === "RECTIFICADO")
      )
    }
  ];
  const clientRevenue = /* @__PURE__ */ new Map();
  allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status)).forEach((invoice) => {
    const clientId = invoice.clienteId;
    const clientName = invoice.cliente?.nome;
    const invoiceTotal = calculateTotalDocumentoFiscal([invoice]);
    if (clientRevenue.has(clientId)) {
      const existing = clientRevenue.get(clientId);
      existing.valor += invoiceTotal;
      existing.quantidade += 1;
    } else {
      clientRevenue.set(clientId, {
        nome: clientName,
        valor: invoiceTotal,
        quantidade: 1
      });
    }
  });
  const topClients = Array.from(clientRevenue.values()).sort((a, b) => b.valor - a.valor).slice(0, 10);
  const productSales = /* @__PURE__ */ new Map();
  allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento) && !ignoredStatus.has(f.status)).forEach((invoice) => {
    invoice.itens.forEach((item) => {
      const itemTotal = calculateTotalItem(item);
      if (productSales.has(item.descricao)) {
        const existing = productSales.get(item.descricao);
        existing.quantidade += item.quantidade;
        existing.valor += itemTotal;
      } else {
        productSales.set(item.descricao, {
          nome: item.descricao,
          quantidade: item.quantidade,
          valor: itemTotal
        });
      }
    });
  });
  const topProducts = Array.from(productSales.values()).sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);
  const recentInvoices = allInvoices.filter((f) => allowedTipos.has(f.tipoDocumento)).slice(0, 10).map((invoice) => ({
    id: invoice.id,
    numero: invoice.numero,
    cliente: invoice.cliente?.nome,
    data: invoice.dataEmissao.toISOString(),
    estado: invoice.estado,
    valor: calculateTotalDocumentoFiscal([invoice])
  }));
  return {
    totalInvoices,
    totalRevenue,
    totalClients,
    totalProducts,
    monthlyRevenue,
    invoicesByStatus,
    topClients,
    topProducts,
    recentInvoices
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 57;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DgWSSgCp.js')).default;
const server_id = "src/routes/(app)/reports/+page.server.ts";
const imports = ["_app/immutable/nodes/57.BH-PEBYJ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BRKAVh4D.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/Bft_5wgO.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/YNjZNZoy.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/Big5sRC4.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/Cf6qd43C.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/CLXrGED-.js","_app/immutable/chunks/CC3jsgOZ.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/DIYfOTad.js"];
const stylesheets = ["_app/immutable/assets/57.ClFwvW7O.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=57-FpOfswRJ.js.map
