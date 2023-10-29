const joi = require("joi");

const schemaParametroId = joi.object({
  id: joi.number().required().messages({
    "number.base": "A id da transação deve ser do tipo numérico.",
  }),
});

module.exports = schemaParametroId;
