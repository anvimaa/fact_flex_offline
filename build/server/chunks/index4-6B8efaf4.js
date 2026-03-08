import { o as objectType, s as stringType, n as numberType, h as arrayType } from './types-C7xnNV5k.js';

const categoriaSchema = objectType({
  nome: stringType().min(1, "Descrição é obrigatória")
});
const vendaSchema = objectType({
  clienteId: stringType().min(1, "Cliente é obrigatório").optional(),
  metodoPagamento: stringType().min(1, "Método de pagamento é obrigatório"),
  observacao: stringType().optional(),
  itens: arrayType(
    objectType({
      produtoId: stringType().min(1, "Produto é obrigatório"),
      quantidade: numberType().min(1, "Quantidade deve ser maior que 0"),
      precoUnitario: numberType().min(0, "Preço unitário deve ser maior ou igual a 0"),
      desconto: numberType().min(0, "Desconto deve ser maior ou igual a 0").default(0),
      descontoPercentual: numberType().min(0, "Desconto deve ser maior ou igual a 0").default(0),
      total: numberType().min(0, "Total deve ser maior ou igual a 0")
    })
  ).min(1, "Venda deve ter pelo menos um item"),
  subtotal: numberType().min(0),
  desconto: numberType().min(0).default(0),
  total: numberType().min(0),
  status: stringType().default("FINALIZADA")
});

export { categoriaSchema as c, vendaSchema as v };
//# sourceMappingURL=index4-6B8efaf4.js.map
