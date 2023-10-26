const { listarCategorias } = require("../db/sql_categories");

const listar = async (req, res) => {
  try {
    const categorias = await listarCategorias();
  
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = {
  listar,
};
