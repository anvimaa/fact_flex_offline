### Guia de Instalação e Inicialização do Sistema (Ambiente Local)

Este guia explica os passos necessários para configurar e iniciar o sistema localmente no computador do cliente.

---

## 1. Requisitos do Sistema

Antes de iniciar a instalação, certifique-se de que os seguintes softwares estão instalados no computador:

1. **Node.js** – Ambiente necessário para executar o servidor da aplicação.
2. **NPM (Node Package Manager)** – Instalado automaticamente junto com o Node.js.
3. **PostgreSQL** – Sistema de gestão de base de dados utilizado pela aplicação.
4. **Terminal do Sistema** – Pode ser utilizado:
   - **PowerShell** (Windows)
   - **Prompt de Comando (CMD)**
   - **Terminal Linux ou macOS**

---

## 2. Configuração da Base de Dados

A aplicação utiliza **PostgreSQL** como base de dados.

### 2.1 Criar a Base de Dados

No PostgreSQL, crie uma nova base de dados para o sistema.

Exemplo:

```
factflex_db
```

---

### 2.2 Configurar o arquivo `.env`

Na pasta raiz do sistema existe um arquivo chamado **.env**.
Abra este arquivo e configure a variável **DATABASE_URL** com os dados da base de dados criada.

Exemplo:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/factflex_db"
```

Onde:

- **usuario** → utilizador do PostgreSQL
- **senha** → palavra-passe do PostgreSQL
- **localhost** → servidor da base de dados
- **5432** → porta padrão do PostgreSQL
- **factflex_db** → nome da base de dados criada

---

## 3. Sincronizar a Base de Dados

Após configurar o `.env`, é necessário criar automaticamente as tabelas da base de dados.

1. Abra o **terminal**.
2. Navegue até à **pasta raiz do sistema**.
3. Execute o seguinte comando:

```
npx prisma@6 db push
```

Este comando irá:

- Conectar ao PostgreSQL
- Criar todas as tabelas necessárias do sistema.

---

## 4. Inicializar o Servidor

Depois da base de dados sincronizada, o servidor pode ser iniciado.

No terminal, ainda dentro da **pasta raiz do sistema**, execute:

```
node build
```

Se tudo estiver configurado corretamente, o servidor será iniciado e o sistema ficará disponível para uso.

---

## 5. Observações Importantes

- O **PostgreSQL deve estar em execução** antes de iniciar o sistema.
- O **arquivo `.env` deve estar corretamente configurado** para evitar erros de conexão.
- Sempre que houver alterações na estrutura da base de dados, o comando abaixo pode ser executado novamente:

```
npx prisma db push
```
