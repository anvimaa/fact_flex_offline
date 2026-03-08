import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { f as fail } from './index-BWA_9C9m.js';
import { D as DocumentoFiscalService } from './documento-fiscal.service-B72KZQqg.js';
import { L as LogService } from './log.service-DCmGal4h.js';
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

class GuiaRemessaService {
  docService = new DocumentoFiscalService();
  logService = new LogService();
  /**
   * Emite uma guia de remessa
   */
  async emitirGuiaRemessa(params) {
    const {
      empresaId,
      clienteId,
      destinatarioNome,
      destinatarioEndereco,
      itens,
      localCarga,
      localDescarga,
      dataSaida,
      dataChegadaPrevista,
      transportador,
      referenciaFactura,
      observacao,
      usuarioId
    } = params;
    if (!itens || itens.length === 0) {
      throw new Error("Guia de remessa deve ter pelo menos um item");
    }
    if (!localCarga || !localDescarga) {
      throw new Error("Locais de carga e descarga são obrigatórios");
    }
    if (!dataSaida) {
      throw new Error("Data de saída é obrigatória");
    }
    return await db.$transaction(async (tx) => {
      const { numero, numeroSequencial } = await this.docService.gerarNumeroSequencial(
        empresaId,
        "GR",
        tx
      );
      const itensGuia = itens.map((item) => ({
        codigo: item.codigo,
        descricao: item.descricao,
        quantidade: item.quantidade,
        unidade: item.unidade || "UN",
        precoUnitario: 0,
        // Guias não têm preço
        desconto: 0,
        descontoValor: 0,
        taxa: 0,
        taxaValor: 0,
        subtotal: 0,
        total: 0,
        empresaId
      }));
      const guiaRemessa = await tx.documentoFiscal.create({
        data: {
          tipoDocumento: "GUIA_REMESSA",
          numero,
          serie: "GR",
          numeroSequencial,
          dataEmissao: /* @__PURE__ */ new Date(),
          dataOperacao: dataSaida,
          empresaId,
          clienteId,
          moeda: "AOA",
          subtotal: 0,
          totalDesconto: 0,
          totalImpostos: 0,
          total: 0,
          retencao: 0,
          observacao: observacao || `Guia de remessa - ${localCarga} → ${localDescarga}${referenciaFactura ? ` (Ref: ${referenciaFactura})` : ""}`,
          referenciaOriginal: referenciaFactura,
          status: "EMITIDO",
          estado: "finalizado",
          regimeFiscal: "NORMAL",
          // Dados específicos de guia de remessa
          localCarga,
          localDescarga,
          dataSaida,
          dataChegadaPrevista,
          transportadorNome: transportador?.nome,
          transportadorNIF: transportador?.nif,
          matriculaVeiculo: transportador?.matriculaVeiculo,
          createdBy: usuarioId,
          itens: {
            create: itensGuia
          }
        },
        include: { itens: true }
      });
      await this.logService.registrarLog(tx, {
        documentoId: guiaRemessa.id,
        acao: "CRIADO",
        descricao: `Guia de remessa emitida - ${localCarga} → ${localDescarga}`,
        usuarioId,
        dadosNovos: JSON.stringify({
          itens: itensGuia.length,
          dataSaida,
          transportador: transportador?.nome,
          referenciaFactura
        })
      });
      return guiaRemessa;
    }, {
      maxWait: 2e4,
      // 20s
      timeout: 6e4
      // 60s
    });
  }
  /**
   * Lista guias de remessa de uma empresa
   */
  async listarGuiasRemessa(empresaId, filtros) {
    const where = {
      empresaId,
      tipoDocumento: "GUIA_REMESSA"
    };
    if (filtros?.dataInicio || filtros?.dataFim) {
      where.dataSaida = {};
      if (filtros.dataInicio) where.dataSaida.gte = filtros.dataInicio;
      if (filtros.dataFim) where.dataSaida.lte = filtros.dataFim;
    }
    if (filtros?.clienteId) {
      where.clienteId = filtros.clienteId;
    }
    if (filtros?.status) {
      where.status = filtros.status;
    }
    return await db.documentoFiscal.findMany({
      where,
      include: {
        itens: true,
        cliente: true,
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { dataSaida: "desc" }
    });
  }
  /**
   * Atualiza status de entrega de uma guia
   */
  async atualizarStatusEntrega(guiaId, status, usuarioId, observacao) {
    return await db.$transaction(async (tx) => {
      const guia = await tx.documentoFiscal.findUnique({
        where: { id: guiaId }
      });
      if (!guia || guia.tipoDocumento !== "GUIA_REMESSA") {
        throw new Error("Guia de remessa não encontrada");
      }
      const estadoAnterior = guia.estado;
      await tx.documentoFiscal.update({
        where: { id: guiaId },
        data: {
          estado: status.toLowerCase(),
          observacao: observacao || guia.observacao
        }
      });
      await this.logService.registrarLog(tx, {
        documentoId: guiaId,
        acao: "STATUS_ATUALIZADO",
        descricao: `Status alterado de ${estadoAnterior} para ${status}`,
        usuarioId,
        dadosAnteriores: JSON.stringify({ estado: estadoAnterior }),
        dadosNovos: JSON.stringify({ estado: status, observacao })
      });
    }, {
      maxWait: 2e4,
      // 20s
      timeout: 6e4
      // 60s
    });
  }
}
const load = async ({ request }) => {
  const empresaId = await getEmpresaId(request);
  const clientes = await db.cliente.findMany({
    where: { empresaId },
    orderBy: { nome: "asc" }
  });
  return {
    clientes
  };
};
const actions = {
  emitir: async ({ request }) => {
    const empresaId = await getEmpresaId(request);
    const usuarioId = await getUserId(request);
    if (!usuarioId) {
      return fail(401, { error: "Usuário não autenticado" });
    }
    const data = await request.formData();
    const clienteId = data.get("clienteId")?.toString() || void 0;
    const localCarga = data.get("localCarga")?.toString();
    const localDescarga = data.get("localDescarga")?.toString();
    const dataSaida = data.get("dataSaida")?.toString();
    const dataChegadaPrevista = data.get("dataChegadaPrevista")?.toString() || void 0;
    const transportadorNome = data.get("transportadorNome")?.toString() || void 0;
    const transportadorNIF = data.get("transportadorNIF")?.toString() || void 0;
    const matriculaVeiculo = data.get("matriculaVeiculo")?.toString() || void 0;
    const observacao = data.get("observacao")?.toString();
    const itensJSON = data.get("itens")?.toString();
    if (!localCarga) {
      return fail(400, { error: "Local de carga é obrigatório" });
    }
    if (!localDescarga) {
      return fail(400, { error: "Local de descarga é obrigatório" });
    }
    if (!dataSaida) {
      return fail(400, { error: "Data de saída é obrigatória" });
    }
    if (!itensJSON) {
      return fail(400, { error: "Adicione pelo menos um item" });
    }
    try {
      const itens = JSON.parse(itensJSON);
      if (!Array.isArray(itens) || itens.length === 0) {
        return fail(400, { error: "Adicione pelo menos um item" });
      }
      const guiaService = new GuiaRemessaService();
      const guia = await guiaService.emitirGuiaRemessa({
        empresaId,
        clienteId,
        itens,
        localCarga,
        localDescarga,
        dataSaida: new Date(dataSaida),
        dataChegadaPrevista: dataChegadaPrevista ? new Date(dataChegadaPrevista) : void 0,
        transportador: transportadorNome ? {
          nome: transportadorNome,
          nif: transportadorNIF,
          matriculaVeiculo
        } : void 0,
        observacao,
        usuarioId
      });
      return {
        success: true,
        message: "Guia de remessa emitida com sucesso",
        guiaId: guia.id,
        numero: guia.numero
      };
    } catch (error) {
      console.error("Erro ao emitir guia de remessa:", error);
      return fail(500, { error: error.message || "Erro ao emitir guia de remessa" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 45;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Uljg7i6_.js')).default;
const server_id = "src/routes/(app)/documentos/guias-remessa/nova/+page.server.ts";
const imports = ["_app/immutable/nodes/45.Ck96QRpP.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BwnMkTyP.js","_app/immutable/chunks/TGl8V12P.js","_app/immutable/chunks/D0bGOvIJ.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/BCLqM_mE.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/ByL5rCyh.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=45-puW-9bDG.js.map
