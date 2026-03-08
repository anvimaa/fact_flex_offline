import { j as json } from './index-BWA_9C9m.js';
import { a as auth } from './auth-ke1JlaCA.js';
import { d as db } from './db-BUWqG89e.js';
import './utils-FiC4zhrQ.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
import '@prisma/client';
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
import 'path';
import 'tls';
import 'fs';
import 'events';
import './performance-now-L-NpSMJt.js';
import './utils3-DjmiJAAD.js';
import './index-DPRpZFUH.js';
import './escaping-CqgfEcN3.js';

const POST = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    if (!session) {
      return json({ error: "Não autorizado" }, { status: 403 });
    }
    const body = await request.json();
    const { name } = body;
    if (!name) {
      return json({ error: "Nome é obrigatório" }, { status: 400 });
    }
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: { name }
    });
    return json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-vyiDvmwp.js.map
