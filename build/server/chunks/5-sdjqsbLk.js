import { d as db } from './db-BUWqG89e.js';
import { Decimal } from '@prisma/client/runtime/library';
import '@prisma/client';

const load = async () => {
  const [
    totalUsers,
    totalUsersInactive,
    totalCompanies,
    payments,
    subscriptions,
    recentPayments,
    monthlyStats
  ] = await Promise.all([
    db.user.count(),
    db.user.count({
      where: {
        active: false
      }
    }),
    db.empresa.count(),
    db.payment.findMany({
      include: {
        subscription: {
          include: {
            user: true
          }
        }
      }
    }),
    db.subscription.findMany(),
    db.payment.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        subscription: {
          include: {
            empresa: true
          }
        }
      }
    }),
    // Últimos 6 meses de estatísticas
    db.payment.findMany({
      where: {
        createdAt: {
          gte: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 6))
        }
      }
    })
  ]);
  const totalPayments = payments.length;
  const approvedPayments = payments.filter((p) => p.status === "APPROVED").length;
  const rejectedPayments = payments.filter((p) => p.status === "REJECTED").length;
  const pendingPayments = payments.filter((p) => p.status === "PENDING").length;
  const totalRevenue = payments.filter((p) => p.status === "APPROVED").reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0)).toNumber();
  const activeSubscriptions = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const monthlySubscriptions = subscriptions.filter((s) => s.planType === "MONTHLY").length;
  const annualSubscriptions = subscriptions.filter((s) => s.planType === "ANNUAL").length;
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = /* @__PURE__ */ new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.toLocaleString("pt-BR", { month: "short" });
    const monthPayments = monthlyStats.filter((payment) => {
      const paymentMonth = new Date(payment.createdAt).getMonth();
      const paymentYear = new Date(payment.createdAt).getFullYear();
      return paymentMonth === date.getMonth() && paymentYear === date.getFullYear();
    });
    return {
      month,
      total: monthPayments.length,
      approved: monthPayments.filter((p) => p.status === "APPROVED").length,
      rejected: monthPayments.filter((p) => p.status === "REJECTED").length,
      revenue: monthPayments.filter((p) => p.status === "APPROVED").reduce((acc, curr) => acc.add(new Decimal(curr.amount)), new Decimal(0)).toNumber()
    };
  }).reverse();
  return {
    stats: {
      totalUsers,
      totalUsersInactive,
      totalCompanies,
      totalPayments,
      approvedPayments,
      rejectedPayments,
      pendingPayments,
      totalRevenue,
      activeSubscriptions,
      monthlySubscriptions,
      annualSubscriptions
    },
    monthlyData,
    recentPayments: recentPayments.map((p) => ({
      ...p,
      amount: new Decimal(p.amount).toNumber()
    }))
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-r8IFpBRr.js')).default;
const server_id = "src/routes/(admin)/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/5.Dy2jhEWQ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/CoUivBMM.js","_app/immutable/chunks/DwlJeGO9.js","_app/immutable/chunks/aqOW1qDw.js","_app/immutable/chunks/B711HfnL.js","_app/immutable/chunks/DLAdb6P4.js","_app/immutable/chunks/BQJFBPnG.js","_app/immutable/chunks/BD2gPh_V.js","_app/immutable/chunks/CzerRWYO.js","_app/immutable/chunks/lCDWzU1M.js","_app/immutable/chunks/Dqy6leAi.js","_app/immutable/chunks/C3ESIHrY.js","_app/immutable/chunks/Dz0FVw7Y.js","_app/immutable/chunks/hdEfbS_i.js","_app/immutable/chunks/BeM9_8ch.js","_app/immutable/chunks/00M-5JKi.js","_app/immutable/chunks/zueKD4i-.js","_app/immutable/chunks/B-ChpzWU.js","_app/immutable/chunks/BNb8TLk_.js","_app/immutable/chunks/DzKZcwai.js","_app/immutable/chunks/DC9vk8jV.js","_app/immutable/chunks/Dm104HC0.js","_app/immutable/chunks/C8RrtpX0.js","_app/immutable/chunks/Dqo90Kq3.js","_app/immutable/chunks/BTQQlOMG.js","_app/immutable/chunks/Bh_rq1mK.js","_app/immutable/chunks/C1IKwK0o.js","_app/immutable/chunks/B-HnWoaZ.js","_app/immutable/chunks/B5vPnWyC.js","_app/immutable/chunks/DubXC2aZ.js","_app/immutable/chunks/B8WOpiTi.js","_app/immutable/chunks/DIYfOTad.js","_app/immutable/chunks/YNjZNZoy.js","_app/immutable/chunks/g0ngLbhj.js","_app/immutable/chunks/Bft_5wgO.js","_app/immutable/chunks/Big5sRC4.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-sdjqsbLk.js.map
