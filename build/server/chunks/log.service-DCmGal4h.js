import { d as db } from './db-BUWqG89e.js';

class LogService {
  /**
   * Registra um log de ação em documento fiscal
   */
  async registrarLog(tx, params) {
    const {
      documentoId,
      acao,
      descricao,
      usuarioId,
      dadosAnteriores,
      dadosNovos,
      ipAddress,
      userAgent
    } = params;
    await tx.logDocumento.create({
      data: {
        documentoId,
        acao,
        descricao,
        usuarioId,
        dadosAnteriores,
        dadosNovos,
        ipAddress,
        userAgent
      }
    });
  }
  /**
   * Lista logs de um documento
   */
  async listarLogs(documentoId) {
    return await db.logDocumento.findMany({
      where: { documentoId },
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: "asc" }
    });
  }
  /**
   * Gera relatório de auditoria de um documento
   */
  async gerarRelatorioAuditoria(documentoId) {
    const logs = await this.listarLogs(documentoId);
    const documento = await db.documentoFiscal.findUnique({
      where: { id: documentoId },
      include: {
        empresa: true,
        cliente: true,
        usuario: true
      }
    });
    return {
      documento,
      logs,
      totalAcoes: logs.length,
      primeiraAcao: logs[0],
      ultimaAcao: logs[logs.length - 1]
    };
  }
}

export { LogService as L };
//# sourceMappingURL=log.service-DCmGal4h.js.map
