const joi = require("joi");

const schemaFiltroTransacao = joi.object({
  filtro: joi
    .array()
    .items(
      joi
        .string()
        .valid(
          "Alimentação",
          "Assinaturas e Serviços",
          "Casa",
          "Mercado",
          "Cuidados Pessoais",
          "Educação",
          "Família",
          "Lazer",
          "Pets",
          "Presentes",
          "Roupas",
          "Saúde",
          "Transporte",
          "Salário",
          "Vendas",
          "Outras receitas",
          "Outras despesas"
        )
    )
    .messages({
      "any.only":
        "O filtro de pesquisa deve ser um dos seguintes valores [Alimentação, Assinaturas e Serviços, Casa, Mercado, Cuidados Pessoais, Lazer, Pets, Presentes, Roupas, Saúde, Transporte, Salário, Vendas, Outras receitas, Outras despesas]",
    }),
});

module.exports = schemaFiltroTransacao;
