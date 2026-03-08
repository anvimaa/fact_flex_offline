import { j as json } from './index-BWA_9C9m.js';
import { h as PRIVATE_PAYPAY_API_URL, i as PRIVATE_PAYPAY_SALE_PRODUCT_CODE, j as PRIVATE_PAYPAY_PUBLIC_KEY, k as PRIVATE_PAYPAY_PRIVATE_KEY, l as PRIVATE_PAYPAY_PARTNER_ID } from './private-BNWMvB1R.js';
import { P as PayPaySDK } from './index3-D5wibyu5.js';
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

const config = {
  partnerId: PRIVATE_PAYPAY_PARTNER_ID,
  privateKey: PRIVATE_PAYPAY_PRIVATE_KEY,
  paypayPublicKey: PRIVATE_PAYPAY_PUBLIC_KEY,
  language: "pt",
  saleProductCode: PRIVATE_PAYPAY_SALE_PRODUCT_CODE,
  apiUrl: PRIVATE_PAYPAY_API_URL
};
const sdk = new PayPaySDK(config);
const POST = async ({ request }) => {
  try {
    const { amount, phoneNum, subject = "Compra" } = await request.json();
    if (!phoneNum) {
      return json({
        message: "Número de telefone é obrigatório para Multicaixa Express",
        status: "error"
      }, { status: 400 });
    }
    const phoneValidation = PayPaySDK.validateAngolaPhoneNumber(phoneNum);
    if (!phoneValidation.isValid) {
      return json({
        message: "Número de telefone inválido",
        status: "error",
        errors: phoneValidation.errors
      }, { status: 400 });
    }
    const req = {
      outTradeNo: PayPaySDK.generateUniqueOrderNo("EXPRESS"),
      amount,
      phoneNum: phoneValidation.formatted,
      subject
    };
    const res = await sdk.createMulticaixaPayment(req);
    console.log("PayPay Express Payment Response:", res);
    if (res.code !== "S0001") {
      return json({
        message: "Erro ao processar pagamento Express",
        status: "error",
        error: res.message
      }, { status: 500 });
    }
    return json({
      message: "Pagamento Express gerado com sucesso",
      status: "success",
      transactionId: res.biz_content?.out_trade_no,
      outTradeNo: res.biz_content?.out_trade_no,
      phoneNumber: phoneValidation.formatted,
      amount,
      subject
    });
  } catch (error) {
    console.error("PayPay Express Payment Error:", error);
    return json({
      message: "Erro ao processar pagamento Express",
      status: "error",
      error: error.message
    }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-ChyxZ66O.js.map
