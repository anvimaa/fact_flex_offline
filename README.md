# 🚀 FACT FLEXI - Guia de Instalação (Ambiente Offline)

Este guia prático foi elaborado para orientar a configuração e execução local do **FACT FLEXI** no computador do cliente.

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

## 4. Inicialização Manual do Servidor (Alternativo)

Se preferir não usar os scripts de inicialização rápida, pode iniciar o servidor manualmente:

No terminal, ainda dentro da **pasta raiz do sistema**, execute:

```
node build
```

Se tudo estiver configurado corretamente, o servidor será iniciado e o sistema ficará disponível para uso.

---

## 🚀 Inicialização Rápida (Recomendado)

Desenvolvemos scripts para que não precise de abrir o terminal manualmente sempre que quiser iniciar o sistema.

### No Windows:

1. Localize o arquivo `iniciar_servidor.bat` na pasta do sistema.
2. Dê um **duplo clique** no arquivo.
3. A "mágica" acontece: o servidor iniciará automaticamente.

### No Linux/macOS:

1. Abra o terminal na pasta do sistema.
2. Execute o comando: `./iniciar_servidor.sh`
3. Ou simplesmente dê um duplo clique no arquivo (se o seu sistema permitir execução de scripts via interface gráfica).

---

## 5. Observações Importantes

- O **PostgreSQL deve estar em execução** antes de iniciar o sistema.
- O **arquivo `.env` deve estar corretamente configurado** para evitar erros de conexão.
- Sempre que houver alterações na estrutura da base de dados, o comando abaixo pode ser executado novamente:

```
npx prisma@6 db push
```

---

## 6. Suporte e Versão Online

### 📡 Como solicitar a Versão Online?

A versão offline do **FACT FLEXI** é ideal para operações sem dependência de internet. Se desejar migrar para a **versão online**, que permite acesso remoto, sincronização em tempo real e backups automáticos na nuvem, entre em contato com a nossa equipa técnica.

### 📞 Contactos para Dúvidas e Suporte

Se encontrar dificuldades durante a instalação ou precisar de assistência técnica:

- **Email:** amantentesoft@gmail.com | anvimaa@gmail.com
- **Telefone/WhatsApp:** (+244) 934 342 795
- **Horário de Atendimento:** Segunda a Sexta, das 08h às 18h, Sabado das 09h às 14h.
- **Web site:** www.factflexi.com

---

## 📝 Informações de Copyright e Licenciamento

© 2026 **AMANTENTE SOFT - COMERCIO & SERVIÇOS, LDA**. Todos os direitos reservados.

- **Produtor:** AMANTENTE SOFT - COMERCIO & SERVIÇOS, LDA
- **Nº da Licença de Software (AGT):** FE/183/AGT/2026
- **Desenvolvedor:** António Mantente (@anvimaa)

_Este software é certificado pela AGT e o seu uso está sujeito aos termos da licença adquirida._
