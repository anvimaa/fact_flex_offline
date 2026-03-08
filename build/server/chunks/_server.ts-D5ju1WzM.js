import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';

const DELETE = async ({ params }) => {
  try {
    const id = params.id;
    await db.produto.delete({
      where: {
        id
      }
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return json(
      {
        error: "Erro ao excluir produto. O produto pode estar sendo usado em outros registros."
      },
      { status: 500 }
    );
  }
};

export { DELETE };
//# sourceMappingURL=_server.ts-D5ju1WzM.js.map
