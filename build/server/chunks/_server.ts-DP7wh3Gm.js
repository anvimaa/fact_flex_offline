import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const POST = async ({ params, request }) => {
  try {
    const { active } = await request.json();
    const user = await db.user.update({
      where: { id: params.id },
      data: { active }
    });
    return json({ success: true, user });
  } catch (error) {
    console.error("Error updating user status:", error);
    return json({ error: "Failed to update user status" }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-DP7wh3Gm.js.map
