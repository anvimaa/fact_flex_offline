import { j as json } from './index-BWA_9C9m.js';
import { h as PRIVATE_PAYPAY_API_URL, i as PRIVATE_PAYPAY_SALE_PRODUCT_CODE, j as PRIVATE_PAYPAY_PUBLIC_KEY, k as PRIVATE_PAYPAY_PRIVATE_KEY, l as PRIVATE_PAYPAY_PARTNER_ID } from './private-BNWMvB1R.js';
import { P as PayPaySDK } from './index3-D5wibyu5.js';
import { g as getUserId } from './get-user-id-D12pItGH.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
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
import './auth-ke1JlaCA.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import '@prisma/client';
import './public-B844qK3e.js';
import './api-BO0T-px8.js';
import 'net';
import 'buffer';
import 'querystring';
import 'tls';
import './performance-now-L-NpSMJt.js';
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

async function createSubscription(amount, planType, periodType, userId, empresaId, paymentMethod, proofFile) {
  const subscription = await db.subscription.findFirst({
    where: {
      empresaId,
      status: "ACTIVE"
    }
  });
  if (subscription) {
    return false;
  }
  const newSubscription = await db.subscription.create({
    data: {
      planType,
      periodType,
      status: "PENDING",
      userId,
      empresaId,
      startDate: /* @__PURE__ */ new Date(),
      endDate: /* @__PURE__ */ new Date()
    }
  });
  await db.payment.create({
    data: {
      amount,
      paymentMethod,
      status: "PENDING",
      empresaId,
      subscriptionId: newSubscription.id,
      proofFile,
      paymentDate: /* @__PURE__ */ new Date()
    }
  });
  return true;
}
const config = {
  partnerId: PRIVATE_PAYPAY_PARTNER_ID,
  privateKey: PRIVATE_PAYPAY_PRIVATE_KEY,
  paypayPublicKey: PRIVATE_PAYPAY_PUBLIC_KEY,
  language: "pt",
  // ou 'en'
  saleProductCode: PRIVATE_PAYPAY_SALE_PRODUCT_CODE,
  apiUrl: PRIVATE_PAYPAY_API_URL
};
const sdk = new PayPaySDK(config);
const POST = async ({ request }) => {
  const userId = await getUserId(request);
  const empresaId = await getEmpresaId(request);
  const {
    amount,
    subject = "FACT FLEXI - Pagamento",
    selectedPlan,
    selectedPeriod
  } = await request.json();
  const req = {
    outTradeNo: PayPaySDK.generateUniqueOrderNo("PAYPAY"),
    amount,
    subject
  };
  const res = await sdk.createPayPayAppPayment(req);
  if (res.code !== "S0001") {
    return json(
      {
        message: "Erro ao processar pagamento por QR PayPay",
        status: "error",
        error: res.message
      },
      { status: 500 }
    );
  }
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    res.biz_content?.dynamic_link
  )}&size=200x200&qzone=1`;
  const appUrl = `paypayao://trade/pay?action=pay&tradeToken=${res.biz_content?.trade_token}`;
  await createSubscription(
    amount,
    selectedPlan,
    selectedPeriod,
    userId,
    empresaId,
    "PayPay",
    res.biz_content?.out_trade_no
  );
  return json({
    message: "QR PayPay gerado com sucesso",
    status: "success",
    transactionId: res.biz_content?.out_trade_no,
    //
    tradeToken: res.biz_content?.trade_token,
    dynamicLink: res.biz_content?.dynamic_link,
    outTradeNo: res.biz_content?.out_trade_no,
    qrcodeUrl: qrUrl,
    appUrl
  });
};

export { POST };
//# sourceMappingURL=_server.ts-BlvULsNw.js.map
