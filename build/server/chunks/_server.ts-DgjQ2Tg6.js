import { j as json } from './index-BWA_9C9m.js';
import { a as auth } from './auth-ke1JlaCA.js';
import { d as db } from './db-BUWqG89e.js';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
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
    const formData = await request.formData();
    const imageFile = formData.get("image");
    if (!imageFile || !(imageFile instanceof File)) {
      return json({ error: "Imagem não fornecida ou inválida" }, { status: 400 });
    }
    if (!imageFile.type.startsWith("image/")) {
      return json({ error: "O arquivo deve ser uma imagem" }, { status: 400 });
    }
    if (imageFile.size > 5 * 1024 * 1024) {
      return json({ error: "O arquivo deve ter no máximo 5MB" }, { status: 400 });
    }
    const uploadsDir = join(process.cwd(), "static", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const timestamp = Date.now();
    const extension = imageFile.name.split(".").pop();
    const filename = `profile-${session.user.id}-${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filepath, buffer);
    const imageUrl = `/uploads/${filename}`;
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl }
    });
    return json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error uploading image:", error);
    return json({ error: "Erro ao fazer upload da imagem" }, { status: 500 });
  }
};

export { POST };
//# sourceMappingURL=_server.ts-DgjQ2Tg6.js.map
