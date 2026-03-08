import { d as db } from './db-BUWqG89e.js';
import { j as json } from './index-BWA_9C9m.js';
import '@prisma/client';
import './utils-FiC4zhrQ.js';

const DELETE = async ({ params }) => {
  try {
    await db.categoria.delete({
      where: {
        id: params.id
      }
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting:", error);
    return json(
      {
        success: false,
        error: "Não foi possível excluir. Verifique se não há produtos associados."
      },
      { status: 500 }
    );
  }
};

export { DELETE };
//# sourceMappingURL=_server.ts-CqEWZ-MW.js.map
