import * as crypto__default from 'crypto';
import * as require$$1 from 'fs';
import * as require$$2 from 'path';

function createHash(message) {
  const privateKeyPath = require$$2.resolve("keys", "fact_flex_privada.key");
  const privateKey = require$$1.readFileSync(privateKeyPath, "utf8");
  const sign = crypto__default.createSign("SHA256");
  sign.update(message);
  sign.end();
  const signature = sign.sign(privateKey, "base64");
  return signature;
}

export { createHash as c };
//# sourceMappingURL=hash-generator-ERpeX74n.js.map
