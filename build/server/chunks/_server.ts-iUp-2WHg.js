import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const POST = async ({ params, request }) => {
  try {
    const { reason } = await request.json();
    const payment = await db.payment.update({
      where: { id: params.id },
      data: {
        status: "REJECTED",
        rejectionReason: reason
      },
      include: {
        subscription: {
          include: {
            user: true
          }
        }
      }
    });
    await db.subscription.update({
      where: { id: payment.subscriptionId },
      data: {
        status: "REJECTED"
      }
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error rejecting payment:", error);
    return json({ error: "Failed to reject payment" }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-iUp-2WHg.js.map
