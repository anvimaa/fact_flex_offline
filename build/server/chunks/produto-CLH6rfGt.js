import { o as objectType, s as stringType, c as coerce } from './types-C7xnNV5k.js';

const produtoSchema = objectType({
  codigo: stringType().min(1, "Código é obrigatório"),
  descricao: stringType().min(1, "Descrição é obrigatória"),
  quantidade: coerce.number().min(0, "Quantidade deve ser maior ou igual a 0"),
  precoUnitario: coerce.number().min(0, "Preço unitário deve ser maior ou igual a 0"),
  desconto: coerce.number().min(0, "Desconto deve ser maior ou igual a 0"),
  fornecedorId: stringType().min(1, "Fornecedor é obrigatório"),
  categoriaId: stringType().min(1, "Categoria é obrigatória"),
  tipo: stringType().min(1, "Tipo é obrigatório"),
  isento: stringType().default("n"),
  motivoIsento: stringType().default(""),
  taxaId: stringType().default("")
});

export { produtoSchema as p };
//# sourceMappingURL=produto-CLH6rfGt.js.map
