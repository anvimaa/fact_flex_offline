import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { A as AGTClient } from './client3-D6-MZ0VN.js';
import { c as AGT_FE_HML_PASSWORD, d as AGT_FE_HML_USER, P as PRIVATE_AGT_FE_PRIVATE_KEY, e as AGT_SOFTWARE_VALIDATION_NUMBER, f as AGT_PRODUCT_VERSION, g as AGT_PRODUCT_ID } from './private-BNWMvB1R.js';
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
import './index-Dn-KpEFr.js';
import './_commonjsHelpers-BFTU3MAI.js';
import 'http2';
import 'tty';
import 'os';
import 'node:fs';
import '@prisma/client/runtime/library';

const load = async ({ request, url }) => {
  const empresaId = await getEmpresaId(request);
  const empresa = await db.empresa.findUnique({
    where: { id: empresaId }
  });
  if (!empresa) {
    return { invoices: [], error: "Empresa não encontrada" };
  }
  const today = /* @__PURE__ */ new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const defaultStartDate = firstDayOfMonth.toISOString().split("T")[0];
  const defaultEndDate = today.toISOString().split("T")[0];
  const startDate = url.searchParams.get("startDate") || defaultStartDate;
  const endDate = url.searchParams.get("endDate") || defaultEndDate;
  const config = {
    taxRegistrationNumber: empresa.nif,
    productId: AGT_PRODUCT_ID,
    productVersion: AGT_PRODUCT_VERSION,
    softwareValidationNumber: AGT_SOFTWARE_VALIDATION_NUMBER,
    privateKeyPem: PRIVATE_AGT_FE_PRIVATE_KEY,
    empresaId: empresa.id,
    user: AGT_FE_HML_USER,
    password: AGT_FE_HML_PASSWORD,
    environment: "hml",
    empresaPrivateKeyPem: empresa.privateKeyPem || void 0
  };
  try {
    if (!config.empresaPrivateKeyPem) {
      throw new Error(
        "A chave privada da empresa não foi configurada. Vá em configurações e adicione a chave PEM."
      );
    }
    const client = new AGTClient(config);
    const response = await client.listInvoices(startDate, endDate);
    console.log("Cliente resultado busca: ", response);
    if (response?.statusResult?.documentResultCount === 0) {
      return {
        invoices: [],
        startDate,
        endDate,
        error: "Nenhum documento encontrado neste período."
      };
    }
    const invoices = response?.statusResult?.resultEntryList.map((entry) => entry.documentEntryResult) || [];
    return {
      invoices: Array.isArray(invoices) ? invoices : [],
      startDate,
      endDate,
      error: null
    };
  } catch (error) {
    console.error("Erro ao listar faturas:", error);
    let errorMsg = error.message || "Erro ao listar documentos da AGT";
    if (error.response?.data?.errorList) {
      errorMsg = error.response.data.errorList.map((e) => e.descriptionError).join(", ");
    } else if (error.response?.data?.errorEntry) {
      errorMsg = error.response.data.errorEntry.descriptionError || JSON.stringify(error.response.data.errorEntry);
    }
    return {
      invoices: [],
      startDate,
      endDate,
      error: errorMsg
    };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 34;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-YhCSxJ8V.js')).default;
const server_id = "src/routes/(app)/documentos/eletronicos/+page.server.ts";
const imports = ["_app/immutable/nodes/34.SPQnv5D5.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/CooZgvxu.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/DZKL8MBn.js","_app/immutable/chunks/dSyDDdoo.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=34-wkXrh6YC.js.map
