import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { a as auth } from './auth-ke1JlaCA.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
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
import 'tls';
import 'events';
import './performance-now-L-NpSMJt.js';
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const amount = parseFloat(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod");
    const paymentDate = new Date(formData.get("paymentDate"));
    const planType = formData.get("planType");
    const periodType = formData.get("periodType");
    const proofFile = formData.get("proofFile");
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session || !session.user) {
      console.error("User not authenticated");
      return json({ error: "Usuario não encontrado." }, { status: 401 });
    }
    const fileName = `${Date.now()}-${proofFile.name}`;
    const subscription = await db.subscription.create({
      data: {
        userId: session?.user.id,
        planType,
        periodType,
        status: "PENDING",
        empresaId: await getEmpresaId(request)
      }
    });
    const payment = await db.payment.create({
      data: {
        subscriptionId: subscription.id,
        amount,
        paymentMethod,
        paymentDate,
        proofFile: `/uploads/proofFiles/${fileName}`,
        status: "PENDING",
        empresaId: await getEmpresaId(request)
      }
    });
    await saveFile(proofFile, fileName);
    return json({ success: true, payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return json({ error: "Failed to create payment" }, { status: 500 });
  }
};
async function saveFile(file, fileName) {
  const filePath = join(process.cwd(), "static", "uploads", "proofFiles", fileName);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  writeFileSync(filePath, buffer);
}

export { POST };
//# sourceMappingURL=_server.ts-B1r-k-H9.js.map
