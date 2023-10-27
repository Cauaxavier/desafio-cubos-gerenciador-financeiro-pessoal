const transactionsRepository = require("../../repository/transacoes");

const listar = async (req, res) => {
  const { filtro } = req.query;
  try {
    const resultado = await transactionsRepository.listarTransacoesUsuario(
      req.userTokenID
    );
    if (filtro) {
      const categoriasFiltradas = resultado.filter((categoria) => {
        return filtro.includes(categoria.categoria_nome);
      });

      return res.status(200).json(categoriasFiltradas);
    }

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = listar;
