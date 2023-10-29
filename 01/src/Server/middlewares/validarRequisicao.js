const validarCorpo = (JoiSchema) => async (req, res, next) => {
  try {
    await JoiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      erro: error,
      mensagem: error.message,
    });
  }
};

const validarParams = (JoiSchema) => async (req, res, next) => {
  try {
    await JoiSchema.validateAsync(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      erro: error,
      mensagem: error.message,
    });
  }
};

const validarQuery = (JoiSchema) => async (req, res, next) => {
  try {
    await JoiSchema.validateAsync(req.query);
    next();
  } catch (error) {
    return res.status(400).json({
      mensagem: error.message,
    });
  }
};

module.exports = {
  validarCorpo,
  validarParams,
  validarQuery,
};
