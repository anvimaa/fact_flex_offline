import { f as fail, e as error } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { s as serialize } from './utils3-DjmiJAAD.js';
import { a as auth } from './auth-ke1JlaCA.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';
import './public-B844qK3e.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import './private-BNWMvB1R.js';
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

const load = async ({ params }) => {
  const empresaId = params.id;
  if (!empresaId) {
    throw error(404, "Empresa não encontrada");
  }
  const empresa = await db.empresa.findUnique({
    where: { id: empresaId },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true,
          createdAt: true
        }
      },
      subscriptions: {
        orderBy: { createdAt: "desc" },
        include: {
          payments: {
            orderBy: { createdAt: "desc" },
            take: 5
          }
        }
      },
      parceiro: true,
      _count: {
        select: {
          clientes: true,
          facturas: true,
          recibos: true,
          produtos: true
        }
      }
    }
  });
  if (!empresa) {
    throw error(404, "Empresa não encontrada");
  }
  const availableUsers = await db.user.findMany({
    where: {
      empresaId: null
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  });
  const allPartners = await db.parceiro.findMany({
    where: { ativo: true },
    select: {
      id: true,
      nome: true,
      codigoRecomendacao: true
    }
  });
  return serialize({
    empresa,
    availableUsers,
    allPartners
  });
};
const actions = {
  associateUser: async ({ request, params }) => {
    const formData = await request.formData();
    const userId = formData.get("userId")?.toString();
    const empresaId = params.id;
    if (!userId || !empresaId) {
      return fail(400, { success: false, message: "ID de utilizador obrigatório" });
    }
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          empresaId
        }
      });
      return { success: true, message: "Utilizador associado com sucesso!" };
    } catch (err) {
      console.error(err);
      return fail(500, { success: false, message: "Erro ao associar utilizador." });
    }
  },
  removeUser: async ({ request }) => {
    const formData = await request.formData();
    const userId = formData.get("userId")?.toString();
    if (!userId) {
      return fail(400, { success: false, message: "ID de utilizador obrigatório" });
    }
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          empresaId: null
        }
      });
      return { success: true, message: "Utilizador removido da empresa com sucesso!" };
    } catch (err) {
      console.error(err);
      return fail(500, { success: false, message: "Erro ao remover utilizador." });
    }
  },
  createUser: async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const role = formData.get("role")?.toString() || "user";
    const empresaId = params.id;
    if (!name || !email || !password || !empresaId) {
      return fail(400, { success: false, message: "Todos os campos são obrigatórios" });
    }
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name
        },
        headers: request.headers
      });
      if (!result || !result.user) {
        return fail(400, {
          success: false,
          message: "Erro ao criar conta. O email pode já estar em uso."
        });
      }
      await db.user.update({
        where: { id: result.user.id },
        data: {
          role,
          active: true,
          empresaId,
          emailVerified: true
        }
      });
      return { success: true, message: "Utilizador criado com sucesso!" };
    } catch (error2) {
      console.error("Erro ao criar usuário:", error2);
      const errorMessage = error2?.body?.message || error2?.message || "Erro ao criar usuário";
      return fail(500, { success: false, message: errorMessage });
    }
  },
  createSubscription: async ({ request, params }) => {
    const formData = await request.formData();
    const planType = formData.get("planType")?.toString() || "basic";
    const periodType = formData.get("periodType")?.toString() || "mensual";
    const durationMonths = parseInt(formData.get("durationMonths")?.toString() || "1");
    const startDateStr = formData.get("startDate")?.toString();
    const amountStr = formData.get("amount")?.toString();
    const empresaId = params.id;
    if (!empresaId || !startDateStr || !amountStr) {
      return fail(400, { success: false, message: "Dados insuficientes." });
    }
    const startDate = new Date(startDateStr);
    const amount = parseFloat(amountStr);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationMonths);
    try {
      const empresa = await db.empresa.findUnique({
        where: { id: empresaId },
        include: { users: { take: 1 } }
      });
      if (!empresa) return fail(404, { success: false, message: "Empresa não encontrada." });
      const userId = empresa.users[0]?.id;
      if (!userId)
        return fail(400, { success: false, message: "A empresa não tem utilizadores associados." });
      const subscription = await db.subscription.create({
        data: {
          userId,
          empresaId,
          planType,
          periodType,
          status: "ACTIVE",
          startDate,
          endDate
        }
      });
      const payment = await db.payment.create({
        data: {
          subscriptionId: subscription.id,
          empresaId,
          amount,
          paymentMethod: "TRANSFER",
          // Use an existing method or 'MANUAL' if allowed
          paymentDate: /* @__PURE__ */ new Date(),
          proofFile: "MANUAL_ACTIVATION",
          status: "APPROVED"
        }
      });
      if (empresa.parceiroId) {
        const parceiro = await db.parceiro.findUnique({
          where: { id: empresa.parceiroId }
        });
        if (parceiro && parceiro.ativo) {
          const percentagem = parceiro.percentagemComissao;
          const valorComissao = amount * Number(percentagem) / 100;
          await db.comissao.create({
            data: {
              parceiroId: parceiro.id,
              empresaId,
              paymentId: payment.id,
              plano: planType,
              periodo: periodType,
              valorPago: amount,
              percentagemAplicada: percentagem,
              valorComissao,
              status: "PENDENTE"
            }
          });
        }
      }
      return { success: true, message: "Assinatura criada e activada com sucesso!" };
    } catch (err) {
      console.error(err);
      return fail(500, { success: false, message: "Erro ao criar assinatura." });
    }
  },
  associatePartner: async ({ request, params }) => {
    const formData = await request.formData();
    const partnerId = formData.get("partnerId")?.toString();
    const empresaId = params.id;
    if (!partnerId || !empresaId) {
      return fail(400, { success: false, message: "ID do parceiro obrigatório" });
    }
    try {
      await db.empresa.update({
        where: { id: empresaId },
        data: { parceiroId: partnerId }
      });
      return { success: true, message: "Parceiro associado com sucesso!" };
    } catch (err) {
      console.error(err);
      return fail(500, { success: false, message: "Erro ao associar parceiro." });
    }
  },
  removePartner: async ({ params }) => {
    const empresaId = params.id;
    if (!empresaId) {
      return fail(400, { success: false, message: "ID da empresa obrigatório" });
    }
    try {
      await db.empresa.update({
        where: { id: empresaId },
        data: { parceiroId: null }
      });
      return { success: true, message: "Parceiro desassociado com sucesso!" };
    } catch (err) {
      console.error(err);
      return fail(500, { success: false, message: "Erro ao desassociar parceiro." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DFsMCLFg.js')).default;
const server_id = "src/routes/(admin)/admin/empresas/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/8.R1oZnkaJ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/CFu2E5Og.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/BNRiUsVl.js","_app/immutable/chunks/B3oQNpac.js","_app/immutable/chunks/DY7KH_Lm.js","_app/immutable/chunks/CoGxwCby.js","_app/immutable/chunks/DNqGNIAo.js","_app/immutable/chunks/D7Q6d-kZ.js","_app/immutable/chunks/ZWNcEGqz.js","_app/immutable/chunks/BrCFcZjU.js","_app/immutable/chunks/DDXLGFqZ.js","_app/immutable/chunks/dep5Binc.js","_app/immutable/chunks/Dvy7avgl.js","_app/immutable/chunks/C-EyQ_y4.js","_app/immutable/chunks/ifXybGp-.js","_app/immutable/chunks/hVYzpWzF.js","_app/immutable/chunks/-i6G_qng.js","_app/immutable/chunks/Big5sRC4.js","_app/immutable/chunks/dSyDDdoo.js","_app/immutable/chunks/DJvz2O16.js","_app/immutable/chunks/DTjfD4Mq.js","_app/immutable/chunks/CH6HTi-R.js","_app/immutable/chunks/BovCmZ-R.js","_app/immutable/chunks/BxrALxPp.js","_app/immutable/chunks/s2C54vnN.js","_app/immutable/chunks/DDfbYvrD.js","_app/immutable/chunks/1tW0rkI_.js","_app/immutable/chunks/qMrFgvei.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DKF17Rty.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-T10s_9z5.js.map
