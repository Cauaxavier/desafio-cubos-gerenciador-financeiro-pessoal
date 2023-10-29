const joi = require("joi");

const schemaParametroId = joi.object({
  id: joi.number().required().messages({
    "number.base": "O campo id deve ser do tipo numérico",
  }),
});

module.exports = schemaParametroId;
