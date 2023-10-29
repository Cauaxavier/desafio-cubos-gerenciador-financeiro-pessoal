const { obterCategoria } = require("../../repository/categorias");
const transactionsRepository = require("../../repository/transacoes");

const cadastrar = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  try {
    const existeCategoria = await obterCategoria(categoria_id);

    if (existeCategoria.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não existe categoria para o id informado." });
    }

    const cadastroTransacao =
      await transactionsRepository.cadastrarTransacaoUsuario(
        req.userTokenID,
        descricao,
        valor,
        data,
        categoria_id,
        tipo
      );

    const detalharTransação =
      await transactionsRepository.detalharTransacaoUsuario(
        req.userTokenID,
        cadastroTransacao[0].id
      );

    return res.status(201).json(detalharTransação[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = cadastrar;
