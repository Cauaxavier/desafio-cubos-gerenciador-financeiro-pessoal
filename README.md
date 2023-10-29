# API RESTful - Gerenciador Financeiro Pessoal - DINDIN


# Desafio Módulo 3 do curso de Desenvolvimento de Software com foco em backend da Cubos Academy.

## Descrição do desafio

Seu papel é construir uma RESTful API que permita:

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações
- [Extra] Filtrar transações por categoria

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e testes.

### 📋 Pré-requisitos

Antes de executar este projeto no seu computador, você precisará de alguns pacotes instalados como:

```
Node.js - Para executar os códigos Javascript fora do navegador;
Express - Pacote do Node.js para subir um servidor http localmente;
Bcrypt - Para criar as hashs das senhas dos usuários;
jsonwebtoken - Pacote usado para gerenciar o login do usuário via token;
Joi - Validar corpo da requisição, além de parâmetros de consulta e de url;
pg - Biblioteca PostgreSQL;
dotenv - Para configurar as variáveis de ambiente;
Insomnia ou Postman - Para testar a API com requisições via GET, POST, PUT e DELETE.
```

### 🔧 Instalação


Para executar o projeto no seu ambiente de desenvolvimento em execução, primeiramente faça o clone desse repositório em sua maquina local na pasta desejada:

```
git clone https://github.com/flavioms86/desafio-cubos-gerenciador-financeiro-pessoal.git
```

Depois abra o projeto em seu editor de códigos, abra o terminal e digite o seguinte comando para a instalação dos pacotes e dependências necessárias:

```
npm install
```

Após a instalação, o servidor pode ser executado via nodemon (para não precisar restartar o servidor depois de alguma alteração):

```
npm run dev
```

Ou pelo node:

```
node ./src/index.js
```

O servidor estará executando localmente e aceitando requisições na porta 3000:

```
localhost:3000
```

## ⚙️ Estrutura do projeto

<img src="./estrutura_projeto.png" alt="Estrutura do Projeto" width="250">

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo senha é obrigatório."
}
```

### **Login do usuário**

#### `POST` `/login`


#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo senha é obrigatório."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, irão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. 

---

### **Detalhar usuário**

#### `GET` `/usuario`

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O token deve ser informado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo email é obrigatório."
}
```

### **Listar categorias**

#### `GET` `/categoria`

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

Obs.: Retorno resumido para fins de demonstração):

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    descricao: "Roupas",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
...
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```

### **Listar transações do usuário logado**

#### `GET` `/transacao`

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    "id": 4,
    "tipo": "entrada",
    "descricao": "Salario Empresa X",
    "valor": "300000",
    "data": "2023-10-28T18:30:00.000Z",
    "usuario_id": 4,
    "categoria_id": 14,
    "categoria_nome": "Salário"
  },
  {
    "id": 5,
    "tipo": "saída",
    "descricao": "Ração Pets",
    "valor": "1200",
    "data": "2023-10-28T11:30:00.000Z",
    "usuario_id": 4,
    "categoria_id": 9,
    "categoria_nome": "Pets"
  },
  {
    "id": 6,
    "tipo": "entrada",
    "descricao": "Skate usado",
    "valor": "3500",
    "data": "2023-10-28T11:40:00.000Z",
    "usuario_id": 4,
    "categoria_id": 15,
    "categoria_nome": "Vendas"
  }
]
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```

### **Listar transações do usuário logado com filtros**

#### `GET` `/transacao?filtro[]=Pets&filtro[]=Vendas`

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    "id": 5,
    "tipo": "saída",
    "descricao": "Ração Pets",
    "valor": "1200",
    "data": "2023-10-28T11:30:00.000Z",
    "usuario_id": 4,
    "categoria_id": 9,
    "categoria_nome": "Pets"
  },
  {
    "id": 6,
    "tipo": "entrada",
    "descricao": "Skate usado",
    "valor": "3500",
    "data": "2023-10-28T11:40:00.000Z",
    "usuario_id": 4,
    "categoria_id": 15,
    "categoria_nome": "Vendas"
  }
]
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O filtro de pesquisa deve ser um dos seguintes valores [Alimentação, Assinaturas e Serviços, Casa, Mercado, Cuidados Pessoais, Lazer, Pets, Presentes, Roupas, Saúde, Transporte, Salário, Vendas, Outras receitas, Outras despesas]"
}
```

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id/detalhar`

#### **Exemplo de requisição**

```javascript
// GET /transacao/4/detalhar
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 4,
    "tipo": "entrada",
    "descricao": "Salario Empresa X",
    "valor": "300000",
    "data": "2023-10-28T18:30:00.000Z",
    "usuario_id": 4,
    "categoria_id": 14,
    "categoria_nome": "Salário"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "A id da transação deve ser do tipo numérico."
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário Empresa X",
    "valor": 300000,
    "data": "2023-10-28T18:30:00.000Z",
    "categoria_id": 14
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 4,
    "tipo": "entrada",
    "descricao": "Salário Empresa X",
    "valor": 300000,
    "data": "2023-10-28T18:30:00.000Z",
    "usuario_id": 4,
    "categoria_id": 14,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O Campo valor é obrigatório."
}
```

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id/atualizar`

#### **Exemplo de requisição**

```javascript
// PUT /transacao/6/atualizar
{
	"descricao": "Skate vermelho usado",
	"valor": 4500,
	"data": "2023-10-28T11:45:00.000Z",
	"categoria_id": 15,
	"tipo": "entrada"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação do usuário não encontrada."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O campo categoria_id é obrigatório."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O tipo só pode ser 'entrada' ou 'saida'."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/6
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação do usuário não encontrada."
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "A id da transação deve ser do tipo numérico."
}
```

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"entrada": 300000,
	"saida": 1200
}
```

---
### ⌨️ Ajustes e melhorias

O projeto poderá ter novos recursos e melhorias como:

- [ ] Adicionar Knex para gestão do banco de dados e das queries;
- [ ] Adicionar testes com a ferramenta Jest;
- [ ] Nova tarefa a ser definida.
- [ ] Nova tarefa a ser definida.
- [ ] Nova tarefa a ser definida.

## 🛠️ Construído com

Ferramentas utilizadas no desenvolvimento do projeto.

* [Node.js](https://nodejs.org/en) - Javascript runtime environment
* [Express](https://expressjs.com/pt-br/) - Framework para aplicação Web do Node.js

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Flávio M. Silva** - *Projeto Curso Backend M03* - [flavioms86](https://github.com/flavioms86)
* **Cauã Gomes Xavier** - *Projeto Curso Backend M03* - [Cauaxavier](https://github.com/Cauaxavier)

## 📄 Licença

Não se aplica.

