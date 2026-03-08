import { d as db } from './db-BUWqG89e.js';
import { A as AGTClient } from './client3-D6-MZ0VN.js';
import { L as LogService } from './log.service-DCmGal4h.js';
import { c as AGT_FE_HML_PASSWORD, d as AGT_FE_HML_USER, P as PRIVATE_AGT_FE_PRIVATE_KEY, e as AGT_SOFTWARE_VALIDATION_NUMBER, f as AGT_PRODUCT_VERSION, g as AGT_PRODUCT_ID } from './private-BNWMvB1R.js';
import './index-Ciy6OqN0.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { d as getPrintUrl, f as formatCurrency, s as serialize } from './utils3-DjmiJAAD.js';
import { f as fail, e as error } from './index-BWA_9C9m.js';
import '@prisma/client';
import './index-Dn-KpEFr.js';
import './_commonjsHelpers-BFTU3MAI.js';
import './index-64ZZ3C7M.js';
import 'path';
import 'util';
import 'stream';
import 'http';
import 'https';
import 'url';
import 'fs';
import 'crypto';
import 'http2';
import 'assert';
import 'tty';
import 'os';
import 'zlib';
import 'events';
import './api-BO0T-px8.js';
import 'net';
import 'buffer';
import 'querystring';
import 'tls';
import './performance-now-L-NpSMJt.js';
import 'node:fs';
import '@prisma/client/runtime/library';
import 'node:crypto';
import './auth-ke1JlaCA.js';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import './public-B844qK3e.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './utils-FiC4zhrQ.js';

class ReenvioDocumentosJob {
  logService = new LogService();
  MAX_TENTATIVAS = 1e3;
  INTERVALO_MINIMO_MINUTOS = 30;
  /**
   * Executa o job de reenvio
   */
  async executar() {
    console.log("[Reenvio de Documentos] Iniciando reenvio de documentos pendentes...");
    const resultado = {
      total: 0,
      sucesso: 0,
      falha: 0,
      detalhes: []
    };
    try {
      const documentosPendentes = await this.buscarDocumentosPendentes();
      resultado.total = documentosPendentes.length;
      console.log(
        `[Reenvio de Documentos] Encontrados ${documentosPendentes.length} documentos pendentes`
      );
      for (const documento of documentosPendentes) {
        try {
          await this.reenviarDocumento(documento);
          resultado.sucesso++;
          resultado.detalhes.push({
            documentoId: documento.id,
            numero: documento.numero,
            status: "SUCESSO",
            mensagem: "Documento enviado com sucesso"
          });
        } catch (error2) {
          resultado.falha++;
          resultado.detalhes.push({
            documentoId: documento.id,
            numero: documento.numero,
            status: "FALHA",
            mensagem: error2.message
          });
          console.error(
            `[Reenvio de Documentos] Erro ao reenviar documento ${documento.numero}:`,
            error2
          );
        }
      }
      console.log(
        `[Reenvio de Documentos] Concluído: ${resultado.sucesso} sucessos, ${resultado.falha} falhas`
      );
    } catch (error2) {
      console.error("[Reenvio de Documentos] Erro ao executar job:", error2);
    }
    return resultado;
  }
  /**
   * Busca documentos pendentes de envio
   */
  async buscarDocumentosPendentes() {
    const dataLimite = /* @__PURE__ */ new Date();
    dataLimite.setMinutes(dataLimite.getMinutes() - this.INTERVALO_MINIMO_MINUTOS);
    return await db.documentoFiscal.findMany({
      where: {
        status: { in: ["PENDENTE_ENVIO", "EMITIDO", "RECTIFICADO"] },
        tipoDocumento: {
          in: ["FACTURA", "RECIBO", "FACTURA_RECIBO", "NOTA_CREDITO", "NOTA_DEBITO"]
        },
        tentativasEnvio: { lt: this.MAX_TENTATIVAS },
        OR: [
          { dataEnvioAGT: null },
          { dataEnvioAGT: { lt: dataLimite } }
          // Última tentativa há mais de 5 minutos
        ]
      },
      include: {
        empresa: true
      },
      orderBy: { dataEmissao: "asc" },
      take: 50
      // Processar no máximo 50 por vez
    });
  }
  /**
   * Reenvia um documento específico
   */
  async reenviarDocumento(documento) {
    console.log(
      `[Reenvio de Documentos] Reenviando documento ${documento.numero} (tentativa ${documento.tentativasEnvio + 1}/${this.MAX_TENTATIVAS})`
    );
    const config = {
      taxRegistrationNumber: documento.empresa.nif,
      productId: AGT_PRODUCT_ID,
      productVersion: AGT_PRODUCT_VERSION,
      softwareValidationNumber: AGT_SOFTWARE_VALIDATION_NUMBER,
      privateKeyPem: PRIVATE_AGT_FE_PRIVATE_KEY,
      empresaId: documento.empresa.id,
      user: AGT_FE_HML_USER,
      password: AGT_FE_HML_PASSWORD,
      environment: "hml",
      empresaPrivateKeyPem: documento.empresa.privateKeyPem
    };
    const client = new AGTClient(config);
    try {
      const resultado = await client.registerInvoiceByIdi(documento.id);
      if (resultado.status !== 200) {
        const errorMsgs = resultado.data.errorList.map((e) => `[Doc: ${e.documentNo || "N/A"}] ${e.idError}: ${e.descriptionError}`).join("; ");
        if (resultado.data.requestID) {
          console.warn(
            `[Reenvio de Documentos] Erros no envio (Request ID: ${resultado.data.requestID}): ${errorMsgs}`
          );
        }
        throw new Error(errorMsgs);
      }
      console.log(
        `[Reenvio de Documentos] ✓ Documento ${documento.numero} enviado com sucesso (Request ID: ${resultado.data.requestID})`
      );
      await db.documentoFiscal.update({
        where: { id: documento.id },
        data: {
          status: "ENVIADO_AGT",
          dataEnvioAGT: /* @__PURE__ */ new Date(),
          codigoValidacaoAGT: resultado.data.requestID,
          // Salvar requestID para consulta posterior
          tentativasEnvio: { increment: 1 }
        }
      });
      await this.logService.registrarLog(db, {
        documentoId: documento.id,
        acao: "REENVIO_ENVIADO",
        descricao: `Documento enviado para processamento. Request ID: ${resultado.data.requestID}`,
        usuarioId: documento.createdBy,
        dadosNovos: JSON.stringify({
          requestID: resultado.data.requestID,
          tentativas: documento.tentativasEnvio + 1
        })
      });
    } catch (error2) {
      console.error(
        `[Reenvio de Documentos] ✗ Falha ao reenviar documento ${documento.numero}:`,
        error2.message || error2
      );
      const novaTentativa = documento.tentativasEnvio + 1;
      await db.documentoFiscal.update({
        where: { id: documento.id },
        data: {
          tentativasEnvio: novaTentativa,
          dataEnvioAGT: /* @__PURE__ */ new Date()
          // Marca a tentativa
        }
      });
      if (novaTentativa >= this.MAX_TENTATIVAS) {
        await db.documentoFiscal.update({
          where: { id: documento.id },
          data: {
            status: "REJEITADO_AGT",
            observacao: `${documento.observacao || ""}

REJEITADO: Máximo de tentativas de envio atingido (${this.MAX_TENTATIVAS})`
          }
        });
        await this.logService.registrarLog(db, {
          documentoId: documento.id,
          acao: "REENVIO_MAXIMO_ATINGIDO",
          descricao: `Documento marcado como rejeitado após ${this.MAX_TENTATIVAS} tentativas`,
          usuarioId: documento.createdBy,
          dadosNovos: JSON.stringify({
            tentativas: this.MAX_TENTATIVAS,
            ultimoErro: error2.message || error2
          })
        });
      } else {
        await this.logService.registrarLog(db, {
          documentoId: documento.id,
          acao: "REENVIO_FALHA",
          descricao: `Tentativa ${novaTentativa} de reenvio falhou`,
          usuarioId: documento.createdBy,
          dadosNovos: JSON.stringify({
            tentativa: novaTentativa,
            erro: error2.message || error2
          })
        });
      }
      throw error2;
    }
  }
  /**
   * Reenvia um documento específico manualmente
   */
  async reenviarManual(documentoId, usuarioId) {
    const documento = await db.documentoFiscal.findUnique({
      where: { id: documentoId },
      include: {
        empresa: true
      }
    });
    if (!documento) {
      throw new Error("Documento não encontrado...");
    }
    if (documento.status === "VALIDADO_AGT") {
      throw new Error("Documento já foi validado pela AGT");
    }
    await db.documentoFiscal.update({
      where: { id: documentoId },
      data: {
        tentativasEnvio: 0,
        status: "PENDENTE_ENVIO"
      }
    });
    await this.logService.registrarLog(db, {
      documentoId,
      acao: "REENVIO_MANUAL_SOLICITADO",
      descricao: "Reenvio manual solicitado pelo usuário",
      usuarioId
    });
    await this.reenviarDocumento(documento);
  }
}
class VerificarStatusJob {
  logService = new LogService();
  // Limite de tempo para considerar um documento como "preso" em processamento (ex: 24 horas)
  TIMEOUT_HORAS = 24;
  async executar() {
    console.log("[VerificarStatusJob] Verificando status de documentos enviados...");
    const resultado = {
      total: 0,
      processados: 0,
      validados: 0,
      rejeitados: 0,
      erros: 0
    };
    try {
      const documentosEnviados = await db.documentoFiscal.findMany({
        where: {
          status: "ENVIADO_AGT",
          codigoValidacaoAGT: { not: null }
          // Precisamos do requestID
        },
        include: {
          empresa: true
        },
        take: 20
      });
      resultado.total = documentosEnviados.length;
      console.log(
        `[VerificarStatusJob] Encontrados ${resultado.total} documentos aguardando validação`
      );
      for (const documento of documentosEnviados) {
        try {
          await this.verificarDocumento(documento);
          resultado.processados++;
        } catch (error2) {
          resultado.erros++;
          console.error(
            `[VerificarStatusJob] Erro ao verificar documento ${documento.numero}:`,
            error2
          );
        }
      }
    } catch (error2) {
      console.error("[VerificarStatusJob] Erro geral na execução:", error2);
    }
    return resultado;
  }
  async verificarDocumento(documento) {
    if (!documento.codigoValidacaoAGT) return { success: false, message: "requestID invalidao" };
    const config = {
      taxRegistrationNumber: documento.empresa.nif,
      productId: AGT_PRODUCT_ID,
      productVersion: AGT_PRODUCT_VERSION,
      softwareValidationNumber: AGT_SOFTWARE_VALIDATION_NUMBER,
      privateKeyPem: PRIVATE_AGT_FE_PRIVATE_KEY,
      empresaId: documento.empresa.id,
      user: AGT_FE_HML_USER,
      password: AGT_FE_HML_PASSWORD,
      environment: "hml",
      empresaPrivateKeyPem: documento.empresa.privateKeyPem
    };
    const client = new AGTClient(config);
    console.log(
      `[VerificarStatusJob] Iniciado consultado na AGT para o documento: ${documento.numero}`
    );
    const response = await client.getInvoiceStatus(
      documento.codigoValidacaoAGT
    );
    console.log(
      `[VerificarStatusJob] Resposta AGT para ${documento.numero} (Request ID: ${response.requestID}): Status List Length: ${response.documentStatusList?.length}`
    );
    if (response.requestErrorList && response.requestErrorList.length > 0 && response.requestErrorList[0].idError) {
      console.warn(
        `[VerificarStatusJob] Erros na requisição de status para ${documento.numero}:`,
        response.requestErrorList
      );
      return { success: false, message: response.requestErrorList[0].descriptionError };
    }
    const docStatus = response.documentStatusList?.find((d) => d.documentNo === documento.numero) || response.documentStatusList?.[0];
    console.log("Documento Status: ", docStatus);
    if (!docStatus) {
      console.warn(
        `[VerificarStatusJob] Documento ${documento.numero} não encontrado na resposta da AGT`
      );
      return {
        success: false,
        message: `Documento ${documento.numero} não encontrado na resposta da AGT`
      };
    }
    const isValid = docStatus.documentStatus === "V";
    const isInvalid = docStatus.documentStatus === "I";
    const hasErrors = docStatus.errorList && docStatus.errorList.length > 0 && docStatus.errorList[0].idError;
    if (isInvalid || hasErrors) {
      await db.documentoFiscal.update({
        where: { id: documento.id },
        data: {
          status: "REJEITADO_AGT",
          observacao: `${documento.observacao || ""}

REJEIÇÃO AGT (Status: ${docStatus.documentStatus}): ${JSON.stringify(docStatus.errorList)}`,
          respostaAGT: JSON.stringify(response)
        }
      });
      await this.logService.registrarLog(db, {
        documentoId: documento.id,
        acao: "AGT_REJEICAO",
        descricao: `Documento rejeitado pela AGT. Status: ${docStatus.documentStatus}`,
        usuarioId: documento.createdBy,
        dadosNovos: JSON.stringify(docStatus)
      });
      return {
        success: false,
        message: `Documento rejeitado pela AGT. Status: ${docStatus.documentStatus}`
      };
    } else if (isValid) {
      await db.documentoFiscal.update({
        where: { id: documento.id },
        data: {
          status: "VALIDADO_AGT",
          dataValidacaoAGT: /* @__PURE__ */ new Date(),
          respostaAGT: JSON.stringify(response)
        }
      });
      await this.logService.registrarLog(db, {
        documentoId: documento.id,
        acao: "AGT_VALIDACAO",
        descricao: "Documento validado pela AGT com sucesso",
        usuarioId: documento.createdBy,
        dadosNovos: JSON.stringify(docStatus)
      });
      return {
        success: true,
        message: `Documento validade pela AGT!`
      };
    } else {
      console.warn(
        `[VerificarStatusJob] Documento ${documento.numero} com status desconhecido: ${docStatus.documentStatus}`
      );
      return {
        success: false,
        message: `Documento ${documento.numero} com status desconhecido: ${docStatus.documentStatus}`
      };
    }
  }
}
function getTipoLabel(tipo) {
  const tipos = {
    FACTURA: "Factura",
    FACTURA_PROFORMA: "Proforma",
    NOTA_CREDITO: "Nota de Crédito",
    NOTA_DEBITO: "Nota de Débito",
    GUIA_REMESSA: "Guia de Remessa",
    RECIBO: "Recibo",
    FACTURA_RECIBO: "Factura Recibo"
  };
  return tipos[tipo] || tipo;
}
const load = async ({ params, request }) => {
  const empresaId = await getEmpresaId(request);
  const documentoId = params.id;
  const documento = await db.documentoFiscal.findUnique({
    where: { id: documentoId },
    include: {
      empresa: true,
      cliente: true,
      usuario: true,
      itens: {
        include: {
          produto: true
        }
      },
      logs: {
        include: {
          usuario: true
        },
        orderBy: { createdAt: "desc" },
        take: 5
      },
      documentoOriginal: {
        include: {
          cliente: true
        }
      },
      documentosRelacionados: {
        include: {
          cliente: true
        }
      }
    }
  });
  if (!documento || documento.empresaId !== empresaId) {
    throw error(404, "Documento não encontrado");
  }
  return serialize({
    documento
  });
};
const actions = {
  reenviar: async ({ params, request }) => {
    const usuarioId = await getUserId(request);
    const documentoId = params.id;
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    try {
      const job = new ReenvioDocumentosJob();
      await job.reenviarManual(documentoId, usuarioId);
      return {
        success: true,
        message: "Documento reenviado para AGT com sucesso"
      };
    } catch (error2) {
      return fail(500, { error: error2.message || "Erro ao reenviar documento" });
    }
  },
  consultarStatus: async ({ params, request }) => {
    const documentoId = params.id;
    try {
      const documento = await db.documentoFiscal.findUnique({
        where: { id: documentoId },
        include: {
          empresa: true
        }
      });
      if (!documento || !documento.codigoValidacaoAGT) {
        return fail(400, { error: "Documento não possui código de validação AGT" });
      }
      const job = new VerificarStatusJob();
      const result = await job.verificarDocumento(documento);
      const status = "SUCESSO";
      return {
        success: result.success,
        status,
        message: result.message
      };
    } catch (error2) {
      return fail(500, { error: error2.message || "Erro ao consultar status" });
    }
  },
  converter: async ({ params, request }) => {
    const usuarioId = await getUserId(request);
    const documentoId = params.id;
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    try {
      const service = new DocumentoFiscalService();
      const novaFactura = await service.converterProForma(documentoId, usuarioId);
      return {
        success: true,
        message: "Factura Pro-Forma convertida com sucesso",
        facturaId: novaFactura.id
      };
    } catch (error2) {
      return fail(500, { error: error2.message || "Erro ao converter documento" });
    }
  },
  anular: async ({ params, request }) => {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    const documentoId = params.id;
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    try {
      const formData = await request.formData();
      const motivoAnulacao = formData.get("motivoAnulacao")?.toString();
      if (!motivoAnulacao) {
        return fail(400, { error: "Motivo da anulação é obrigatório" });
      }
      const documento = await db.documentoFiscal.findUnique({
        where: { id: documentoId },
        select: { empresaId: true, status: true }
      });
      if (!documento || documento.empresaId !== empresaId) {
        return fail(404, { error: "Documento não encontrado" });
      }
      if (documento.status === "ANULADO") {
        return fail(400, { error: "Documento já está anulado" });
      }
      await db.logDocumento.create({
        data: {
          documentoId,
          acao: "ANULADO",
          descricao: `Documento anulado com motivo: ${motivoAnulacao}`,
          usuarioId,
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
          userAgent: request.headers.get("user-agent") || null
        }
      });
      return {
        success: true,
        message: "Documento anulado com sucesso"
      };
    } catch (error2) {
      console.error("Erro ao anular documento:", error2);
      return fail(500, { error: error2.message || "Erro ao anular documento" });
    }
  },
  compartilhar: async ({ params, request }) => {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    const documentoId = params.id;
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    try {
      const formData = await request.formData();
      const metodo = formData.get("metodo")?.toString();
      const destinatario = formData.get("destinatario")?.toString();
      const mensagem = formData.get("mensagem")?.toString();
      if (!metodo || !destinatario) {
        return fail(400, { error: "Método e destinatário são obrigatórios" });
      }
      const documento = await db.documentoFiscal.findUnique({
        where: { id: documentoId },
        include: {
          cliente: true,
          empresa: true
        }
      });
      if (!documento || documento.empresaId !== empresaId) {
        return fail(404, { error: "Documento não encontrado" });
      }
      const reportUrl = `${new URL(request.url).origin}/reports/${getPrintUrl(documento.tipoDocumento)}/${documentoId}`;
      let result = { success: false, error: "Método desconhecido" };
      if (metodo === "whatsapp") {
        const { WhatsAppService } = await import('./whatsapp-DGOmBbG6.js');
        const whatsAppService = new WhatsAppService();
        const phoneNumber = destinatario.replace(/\D/g, "");
        const defaultMessage = `Olá, estou compartilhando o documento fiscal ${documento.numero} (${getTipoLabel(documento.tipoDocumento)}) no valor de ${formatCurrency(documento.total)}.`;
        const customMessage = mensagem ? `${mensagem}

${defaultMessage}` : defaultMessage;
        const response = await whatsAppService.sendDocumentMessage(
          phoneNumber,
          customMessage,
          reportUrl
        );
        if (response.success) {
          result = { success: true, error: "" };
        } else {
          return fail(500, { error: response.error || "Erro ao enviar mensagem WhatsApp" });
        }
      } else if (metodo === "email") {
        const { sendDocumentShareEmail } = await import('./email-6u-JEkRs.js');
        const destinatarioNome = documento.cliente?.nome || "Cliente";
        const emailSent = await sendDocumentShareEmail(
          destinatario,
          destinatarioNome,
          documento.numero,
          getTipoLabel(documento.tipoDocumento),
          formatCurrency(documento.total),
          reportUrl,
          mensagem
        );
        if (emailSent) {
          result = { success: true, error: "" };
        } else {
          return fail(500, { error: "Erro ao enviar email" });
        }
      } else {
        return fail(400, { error: "Método de compartilhamento inválido" });
      }
      return {
        success: true,
        message: `Documento compartilhado via ${metodo === "whatsapp" ? "WhatsApp" : "Email"} com sucesso`
      };
    } catch (error2) {
      console.error("Erro ao compartilhar documento:", error2);
      return fail(500, { error: error2.message || "Erro ao compartilhar documento" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 43;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-L-E4MeLz.js')).default;
const server_id = "src/routes/(app)/documentos/fiscais/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/43.Dv3usDA1.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/DPH6oIKU.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/57zjA3Wr.js","_app/immutable/chunks/CAnT7MRO.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Rz45323c.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/DIYfOTad.js","_app/immutable/chunks/BWw0RkM7.js","_app/immutable/chunks/tExnXwJ7.js","_app/immutable/chunks/EXEvC9-6.js","_app/immutable/chunks/C8fndNxQ.js","_app/immutable/chunks/D7Q6d-kZ.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=43-N-2UKnm2.js.map
