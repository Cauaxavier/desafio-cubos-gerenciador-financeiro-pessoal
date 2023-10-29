const joi = require("joi");

const schemaAtualizarTransacao = joi.object({
  tipo: joi.string().required().valid("entrada", "saída").messages({
    "any.required": "O campo tipo é obrigatório",
    "string.base": "O campo tipo deve ser do tipo string",
    "string.empty": "O campo tipo é obrigatório",
    "any.only": "O tipo deve ser 'entrada' ou 'saída'",
  }),
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório",
    "string.base": "O campo descricao deve ser do tipo string",
    "string.empty": "O campo descricao é obrigatório",
  }),
  valor: joi.number().positive().required().messages({
    "number.base": "O campo valor deve ser do tipo numérico.",
    "any.required": "O campo valor é obrigatório",
  }),
  data: joi.string().required().messages({
    "any.required": "O campo data é obrigatório",
    "string.base": "O campo data deve ser do tipo string",
    "string.empty": "O campo data é obrigatório",
  }),
  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "O campo categoria_id deve ser do tipo numérico.",
  }),
});

module.exports = schemaAtualizarTransacao;
