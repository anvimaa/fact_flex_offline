import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Decimal } from 'decimal.js';
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Iniciando seed de dados...');

	// Obter empresa
	const empresa = await prisma.empresa.findFirst();

	if (!empresa) {
		console.error(`❌ Nenhuma empresa encontrada!`);
		return;
	}

	console.log(`✅ Empresa encontrada: ${empresa.nome}`);

	// Obter usuário
	const usuario = await prisma.user.findFirst({
		where: { empresaId: empresa.id }
	});

	if (!usuario) {
		console.error(`❌ Nenhum usuário encontrado!`);
		return;
	}

	console.log(`✅ Usuário encontrado: ${usuario.name}`);

	const EMPRESA_ID = empresa.id;
	const USUARIO_ID = usuario.id;

	// 1. Criar Taxas (caso não existam)
	console.log('\n💰 Verificando/criando taxas...');
	let taxaPadrao = await prisma.taxa.findFirst();

	if (!taxaPadrao) {
		taxaPadrao = await prisma.taxa.create({
			data: {
				tipo: 'IVA',
				regiao: 'AO',
				codigo: 'NOR',
				descricao: 'Taxa Normal - 14%',
				valor: 14,
				observacao: 'Taxa de IVA padrão para Angola'
			}
		});
		console.log(`✅ Taxa padrão criada: ${taxaPadrao.descricao} (${taxaPadrao.valor}%)`);
	} else {
		console.log(`✅ Taxa padrão encontrada: ${taxaPadrao.descricao} (${taxaPadrao.valor}%)`);
	}

	// 2. Criar Categorias
	console.log('\n📊 Criando categorias...');
	const categoriasData = [
		{ nome: 'Eletrônicos' },
		{ nome: 'Roupas' },
		{ nome: 'Alimentos' },
		{ nome: 'Móveis' },
		{ nome: 'Ferramentas' },
		{ nome: 'Livros' },
		{ nome: 'Brinquedos' },
		{ nome: 'Cosméticos' },
		{ nome: 'Esportes' },
		{ nome: 'Automotivo' }
	];

	const categorias = await Promise.all(
		categoriasData.map(async (categoria) => {
			return await prisma.categoria.create({
				data: {
					...categoria,
					empresaId: EMPRESA_ID
				}
			});
		})
	);

	console.log(`✅ ${categorias.length} categorias criadas`);

	// 3. Criar Fornecedores
	console.log('\n🚛 Criando fornecedores...');
	const fornecedores = await Promise.all(
		Array.from({ length: 15 }).map(async (_) => {
			return await prisma.fornecedor.create({
				data: {
					nome: faker.company.name(),
					nif: `NIF${faker.string.numeric(9)}`,
					endereco: faker.location.streetAddress(),
					telefone: faker.phone.number(),
					email: faker.internet.email(),
					empresaId: EMPRESA_ID
				}
			});
		})
	);

	console.log(`✅ ${fornecedores.length} fornecedores criados`);

	// 4. Criar Produtos
	console.log('\n📦 Criando produtos...');
	const produtos = await Promise.all(
		Array.from({ length: 50 }).map(async (_) => {
			// Selecionar categoria aleatória
			const categoria = faker.helpers.arrayElement(categorias);
			// Selecionar fornecedor aleatório
			const fornecedor = faker.helpers.arrayElement(fornecedores);

			// Gerar valores aleatórios
			const precoUnitario = new Decimal(faker.commerce.price({ min: 2000, max: 100000 }));
			const quantidade = faker.number.int({ min: 0, max: 1000 });
			const desconto = faker.number.float({ min: 0, max: 15, fractionDigits: 2 });
			const isIsento = faker.helpers.arrayElement(['on', 'n']);

			// Selecionar código de isenção aleatório do arquivo taxaExceptins.ts
			const codigosIsencao = [
				'M00',
				'M02',
				'M04',
				'M10',
				'M11',
				'M12',
				'M13',
				'M14',
				'M15',
				'M16',
				'M17',
				'M18',
				'M19',
				'M20',
				'M21',
				'M22',
				'M23',
				'M24'
			];

			const codigoIsencao = isIsento === 'on' ? faker.helpers.arrayElement(codigosIsencao) : null;

			// Associar taxa (se não isento)
			const taxaId = isIsento === 'on' ? null : taxaPadrao.id;

			return await prisma.produto.create({
				data: {
					codigo: `PROD-${faker.string.alphanumeric(6).toUpperCase()}`,
					descricao: faker.commerce.productName(),
					quantidade,
					precoUnitario,
					taxaId, // Associando com a taxa padrão
					tipo: faker.helpers.arrayElement(['P', 'S']),
					desconto,
					isento: isIsento,
					motivoIsento: codigoIsencao, // Salvando o código em vez da descrição
					empresaId: EMPRESA_ID,
					fornecedorId: fornecedor.id,
					categoriaId: categoria.id
				}
			});
		})
	);

	console.log(`✅ ${produtos.length} produtos criados`);

	// 5. Criar alguns clientes de exemplo
	console.log('\n👥 Criando clientes...');
	const clientes = await Promise.all(
		Array.from({ length: 20 }).map(async (_) => {
			const nifSingular = `${faker.string.numeric(9)}${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.string.numeric(3)}`;

			const prefixos = ['91', '92', '93', '94', '95', '97', '99'];
			const telefoneAngola = `+244 ${faker.helpers.arrayElement(prefixos)}${faker.string.numeric(7)}`;

			return await prisma.cliente.create({
				data: {
					empresaId: EMPRESA_ID,
					tipo: faker.helpers.arrayElement(['SINGULAR', 'COLETIVO']),
					nome: faker.person.fullName(),
					nif: nifSingular,
					endereco: faker.location.streetAddress(),
					email: faker.internet.email(),
					pais: 'Angola',
					caixaPostal: faker.location.zipCode(),
					cidade: faker.location.city(),
					website: faker.internet.url(),
					telefone: telefoneAngola,
					telemovel: telefoneAngola,
					fax: telefoneAngola
				}
			});
		})
	);

	console.log(`✅ ${clientes.length} clientes criados`);

	console.log('\n🎉 Seed concluído com sucesso!');
	console.log('\n📊 Resumo:');
	console.log('  - Taxas: 1 (IVA 14%)');
	console.log(`  - Categorias: ${categorias.length}`);
	console.log(`  - Fornecedores: ${fornecedores.length}`);
	console.log(`  - Produtos: ${produtos.length}`);
	console.log(`  - Clientes: ${clientes.length}`);
}

main()
	.catch((e) => {
		console.error('❌ Erro durante o seed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
