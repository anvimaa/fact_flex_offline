import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const GET = async ({ locals }) => {
  try {
    const payments = await db.payment.findMany({
      include: {
        subscription: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return json({ error: "Failed to fetch payments" }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-ChQCaPm4.js.map
