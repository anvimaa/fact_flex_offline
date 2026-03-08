import { j as json } from './index-BWA_9C9m.js';
import { d as db } from './db-BUWqG89e.js';
import { g as getEmpresaId } from './get-empresa-id-B7WuhWrQ.js';
import './utils-FiC4zhrQ.js';
import '@prisma/client';
import './auth-ke1JlaCA.js';
import 'node:crypto';
import './types-C7xnNV5k.js';
import './index-CQZxJQQs.js';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:buffer';
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

async function gerarNumeroFactura(empresaId, tipo = "factura") {
  const ultimaFactura = await db.factura.findFirst({
    where: {
      empresaId,
      tipo
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  let sequencia = 1;
  if (ultimaFactura?.numero) {
    const ultimoNumero = parseInt(ultimaFactura.numero.split("/")[1]);
    sequencia = ultimoNumero + 1;
  }
  const numeroFormatado = sequencia.toString().padStart(4, "0");
  let prefixo = "FT";
  switch (tipo) {
    case "factura":
      prefixo = "FT";
      break;
    case "recibo":
      prefixo = "RC";
      break;
    case "proforma":
      prefixo = "PP";
      break;
    case "notaCredito":
      prefixo = "NC";
      break;
    case "notaDebito":
      prefixo = "ND";
      break;
    case "faturaRecibo":
      prefixo = "FR";
      break;
    default:
      prefixo = "FT";
      break;
  }
  return `${prefixo} ${(/* @__PURE__ */ new Date()).getFullYear()}/${numeroFormatado}`;
}
const POST = async ({ request, url }) => {
  try {
    const tipo = url.searchParams.get("tipo") || "factura";
    const factura = await request.json();
    const empresaId = await getEmpresaId(request);
    let cliente = await db.cliente.findFirst({
      where: {
        nif: factura.cliente.nif
      }
    });
    if (!cliente) {
      cliente = await db.cliente.create({
        data: {
          ...factura.cliente,
          empresaId
        }
      });
    }
    await db.factura.create({
      data: {
        numero: await gerarNumeroFactura(empresaId, tipo),
        data: new Date(factura.data),
        moeda: factura.moeda,
        clienteId: cliente.id,
        empresaId,
        vencimento: factura.vencimento,
        vref: factura.vref,
        serie: factura.serie,
        tipo,
        retencao: factura.retencao,
        observacao: factura.observacao,
        items: {
          create: factura.items.map((item) => ({
            empresa: { connect: { id: empresaId } },
            taxa: item.taxa,
            codigo: item.codigo,
            descricao: item.descricao,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            desconto: item.desconto,
            motivoIsento: `${item.motivoIsento ?? ""}`
            // ensure primitive string
          }))
        }
      }
    });
    return json({ success: true, message: "Documento criado com sucesso" });
  } catch (error) {
    console.error(error);
    return json(
      { success: false, message: "Erro ao criar Documento" },
      { status: 500 }
    );
  }
};

export { POST };
//# sourceMappingURL=_server.ts-DGg1K5l-.js.map
