import { o as objectType, s as stringType } from './types-C7xnNV5k.js';

const clienteSchema = objectType({
  id: stringType().optional(),
  empresaId: stringType().optional(),
  tipo: stringType().default("SINGULAR"),
  nome: stringType().min(1, "Nome é obrigatório"),
  nif: stringType().min(1, "NIF é obrigatório"),
  endereco: stringType().min(1, "Endereço é obrigatório"),
  email: stringType().email("Email inválido").nullable(),
  pais: stringType().nullable(),
  caixaPostal: stringType().nullable(),
  cidade: stringType().nullable(),
  website: stringType().nullable(),
  telefone: stringType().nullable(),
  telemovel: stringType().nullable(),
  fax: stringType().nullable()
});

export { clienteSchema as c };
//# sourceMappingURL=cliente-Bi3Ts79T.js.map
