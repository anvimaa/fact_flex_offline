import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const POST = async ({ params }) => {
  try {
    const payment = await db.payment.update({
      where: { id: params.id },
      data: { status: "APPROVED" },
      include: {
        subscription: {
          include: {
            user: true
          }
        },
        empresa: {
          include: {
            parceiro: true
          }
        }
      }
    });
    await db.subscription.update({
      where: { id: payment.subscriptionId },
      data: {
        status: "ACTIVE",
        startDate: /* @__PURE__ */ new Date(),
        endDate: payment.subscription.periodType === "mensal" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3)
        // 1 year
      }
    });
    if (payment.empresa?.parceiro && payment.empresa.parceiro.ativo) {
      const parceiro = payment.empresa.parceiro;
      const percentagem = parceiro.percentagemComissao;
      const valorComissao = payment.amount.mul(percentagem).div(100);
      const comissaoExistente = await db.comissao.findUnique({
        where: { paymentId: payment.id }
      });
      if (!comissaoExistente) {
        await db.comissao.create({
          data: {
            parceiroId: parceiro.id,
            empresaId: payment.empresaId,
            paymentId: payment.id,
            plano: payment.subscription.planType,
            periodo: payment.subscription.periodType,
            valorPago: payment.amount,
            percentagemAplicada: percentagem,
            valorComissao,
            status: "PENDENTE"
          }
        });
      }
    }
    return json({ success: true });
  } catch (error) {
    console.error("Error approving payment:", error);
    return json({ error: "Failed to approve payment" }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-sXaww4iC.js.map
