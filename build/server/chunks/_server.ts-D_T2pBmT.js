import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const GET = async ({ locals }) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        name: true,
        email: true,
        active: true,
        createdAt: true
      }
    });
    return json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-D_T2pBmT.js.map
