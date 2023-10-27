const { listarCategorias } = require("../../repository/categorias");

const listar = async (req, res) => {
  try {
    const categorias = await listarCategorias();

    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = listar;
