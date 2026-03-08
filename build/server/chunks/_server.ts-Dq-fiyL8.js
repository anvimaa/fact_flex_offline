import { j as json } from './index-BWA_9C9m.js';
import require$$4 from 'https';
import { a as axios } from './index-Dn-KpEFr.js';
import './utils-FiC4zhrQ.js';
import './_commonjsHelpers-BFTU3MAI.js';
import './index-64ZZ3C7M.js';
import 'path';
import 'util';
import 'stream';
import 'http';
import 'url';
import 'fs';
import 'crypto';
import 'http2';
import 'assert';
import 'tty';
import 'os';
import 'zlib';
import 'events';

const GET = async ({ url }) => {
  const nif = url.searchParams.get("nif");
  if (!nif) {
    return json({ error: "NIF não fornecido" }, { status: 400 });
  }
  try {
    const auth = btoa(`ws.hml.anvima:mfn73432026`);
    const httpsAgent = new require$$4.Agent({
      keepAlive: false,
      minVersion: "TLSv1.2",
      maxVersion: "TLSv1.2",
      maxSockets: 1
    });
    const response = await axios.get(
      `https://sifphml.minfin.gov.ao/sigt/contribuinte/consultarNIF/v5/obter?tipoDocumento=NIF&numeroDocumento=${nif}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${auth}`
        },
        httpsAgent
      }
    );
    console.log(response.data);
    return json(response.data);
  } catch (error) {
    console.error("Erro ao consultar NIF:", error);
    if (axios.isAxiosError(error) && error.response) {
      return json(
        { error: error.response.data?.mensagem || "Erro na consulta do NIF" },
        { status: error.response.status }
      );
    }
    return json({ error: "Erro interno ao consultar NIF" }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-Dq-fiyL8.js.map
