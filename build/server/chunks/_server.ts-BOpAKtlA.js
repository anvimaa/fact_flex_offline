import { e as error, j as json } from './index-BWA_9C9m.js';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import './utils-FiC4zhrQ.js';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!file) {
      throw error(400, "No file uploaded");
    }
    if (!file.type.startsWith("image/")) {
      throw error(400, "File must be an image");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw error(400, "File size must be less than 5MB");
    }
    const uploadsDir = join(process.cwd(), "static", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filepath, buffer);
    return json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload error:", err);
    throw error(500, "Error uploading file");
  }
};

export { POST };
//# sourceMappingURL=_server.ts-BOpAKtlA.js.map
