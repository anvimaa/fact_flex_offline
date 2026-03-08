import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { A as AGTClient } from './client3-D6-MZ0VN.js';
import { c as AGT_FE_HML_PASSWORD, d as AGT_FE_HML_USER, P as PRIVATE_AGT_FE_PRIVATE_KEY, e as AGT_SOFTWARE_VALIDATION_NUMBER, f as AGT_PRODUCT_VERSION, g as AGT_PRODUCT_ID } from './private-BNWMvB1R.js';
import { f as fail } from './index-BWA_9C9m.js';
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
import './utils-FiC4zhrQ.js';

const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const empresa = await db.empresa.findUnique({
    where: { id: empresaId }
  });
  if (!empresa) {
    return { series: [], error: "Empresa não encontrada" };
  }
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
    const response = await client.listSeries({
      establishmentNumber: "SEDE"
    });
    const series = response.seriesInfo || [];
    if (series.length > 0) {
      for (const serie of series) {
        const serieExists = await db.serieAGT.findFirst({
          where: {
            seriesCode: serie.seriesCode
          }
        });
        if (serieExists) {
          continue;
        }
        await db.serieAGT.create({
          data: {
            empresaId: empresa.id,
            seriesYear: serie.seriesYear,
            documentType: serie.documentType,
            seriesCode: serie.seriesCode,
            seriesStatus: serie.seriesStatus,
            seriesCreationDate: serie.seriesCreationDate
          }
        });
      }
    }
    return {
      series: Array.isArray(series) ? series : [],
      error: null
    };
  } catch (error) {
    console.error("Erro ao listar séries:", error);
    return {
      series: [],
      error: error.message || "Erro ao listar séries da AGT"
    };
  }
};
const actions = {
  requestSeries: async ({ request }) => {
    const empresaId = await getEmpresaId(request);
    const empresa = await db.empresa.findUnique({
      where: { id: empresaId }
    });
    if (!empresa) {
      return fail(400, { error: "Empresa não encontrada" });
    }
    const data = await request.formData();
    const seriesYear = data.get("seriesYear")?.toString();
    const documentType = data.get("documentType")?.toString();
    const establishmentNumber = data.get("establishmentNumber")?.toString() || "SEDE";
    const seriesContingencyIndicator = data.get("seriesContingencyIndicator")?.toString() || "N";
    if (!seriesYear || !documentType) {
      return fail(400, { error: "O ano da série e o tipo de documento são obrigatórios" });
    }
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
      const response = await client.requestSeries({
        seriesYear,
        documentType,
        establishmentNumber,
        seriesContingencyIndicator
      });
      if (response?.errorList && response.errorList.length > 0 && response.errorList[0].idError) {
        const errorMsgs = typeof response.errorList[0] === "string" ? response.errorList.join(", ") : response.errorList.map((e) => e.descriptionError || JSON.stringify(e)).join(", ");
        return fail(400, { error: `Erro da AGT: ${errorMsgs}` });
      }
      if (response?.resultCode !== 1 && response?.resultCode !== "1") {
        return fail(400, {
          error: "Erro desconhecido ao solicitar série da AGT.",
          rawData: JSON.stringify(response)
        });
      }
      return {
        success: true,
        message: `Série ${response?.seriesInfo?.seriesCode || ""} criada com sucesso para ${response?.seriesInfo?.authorizedQuantity || 0} faturas.`,
        result: response?.seriesInfo
      };
    } catch (error) {
      console.error("Erro ao solicitar série:", error);
      if (error.response?.data?.errorList) {
        return fail(400, {
          error: error.response.data.errorList.map((e) => e.descriptionError).join(", ")
        });
      }
      return fail(500, { error: error.message || "Erro ao processar solicitação de série" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 53;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-U-yLC3rF.js')).default;
const server_id = "src/routes/(app)/documentos/series/+page.server.ts";
const imports = ["_app/immutable/nodes/53.DbG5vxD_.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/Bj6ZxzB-.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/CooZgvxu.js","_app/immutable/chunks/Ch213L8M.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=53-5LoD-uDt.js.map
