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

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível atualizar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Validar os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no corpo (body) da requisição.
  - Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"categoria_id": 4,
	"tipo": "saida"
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
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.  
**Lembre-se:** Deverá ser possível excluir **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**:
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
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
    "mensagem": "Transação não encontrada."
}
```

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.
**Lembre-se:** Deverá ser possível consultar **apenas** transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**:
  - Em caso de não existir transações do tipo `entrada` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.
  - Em caso de não existir transações do tipo `saida` cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.

**Importante: A criação desta rota, no arquivo `rotas.js`, deverá acontecer antes da criação da rota de detalhamento de uma transação (`GET /transacao/:id`), caso contrário, esta rota nunca será possível ser acessada.**

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
	"saida": 15800
}
```

---

## **EXTRA**

**ATENÇÃO!:** Esta parte extra não é obrigatória e recomendamos que seja feita apenas quando terminar toda a parte obrigatória acima.

### **Filtrar transações por categoria**

Na funcionalidade de listagem de transações do usuário logado (**GET /transacao**), deveremos incluir um parâmetro do tipo query **filtro** para que seja possível consultar apenas transações das categorias informadas.

**Lembre-se:** Deverão ser retornadas **apenas** transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
  Parâmetro opcional do tipo query **filtro**.
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (transações) encontradas.  
  Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **REQUISITOS OBRIGATÓRIOS**
  - O usuário deverá ser identificado através do ID presente no token de validação
  - O parâmetro opcional do tipo query **filtro**, quando enviado, deverá ser sempre um array contendo a descrição de uma ou mais categorias.
  - O endpoint deverá responder com um array de todas as transações associadas ao usuário que sejam da categorias passadas no parâmetro query. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

#### **Exemplo de requisição**

```javascript
// GET /transacao?filtro[]=roupas&filtro[]=salários
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24T15:30:00.000Z",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
];
```

```javascript
// HTTP Status 200 / 201 / 204
[];
```

---

Link do deploy da API somente para testes: [ link](https://desafio-backend-03-dindin.pedagogico.cubos.academy/)

**Este link é somente para testes (ou seja, será possível realizar requisições a esta API através deste link)**

---

**LEMBRE-SE**: Feito é melhor que perfeito!!!

###### tags: `back-end` `módulo 3` `nodeJS` `PostgreSQL` `API REST` `desafio`
