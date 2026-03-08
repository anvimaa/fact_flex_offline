import crypto__default__default from 'crypto';
import { A as ADMIN_SECRET_KEY } from './private-BNWMvB1R.js';

const ALGORITHM = "aes-256-gcm";
function getSecretKey() {
  const key = ADMIN_SECRET_KEY;
  const secretBuffer = Buffer.from(key, "hex");
  if (secretBuffer.length !== 32) {
    throw new Error("ADMIN_SECRET_KEY must be a 64-character hexadecimal string.");
  }
  return secretBuffer;
}
function encryptSession(text) {
  const iv = crypto__default__default.randomBytes(16);
  const cipher = crypto__default__default.createCipheriv(ALGORITHM, getSecretKey(), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}
function decryptSession(encryptedData) {
  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 3) return null;
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto__default__default.createDecipheriv(ALGORITHM, getSecretKey(), iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (e) {
    console.error("Erro a desencriptar sessão:", e);
    return null;
  }
}

export { decryptSession as d, encryptSession as e };
//# sourceMappingURL=crypto-Dg_tq0Mh.js.map
