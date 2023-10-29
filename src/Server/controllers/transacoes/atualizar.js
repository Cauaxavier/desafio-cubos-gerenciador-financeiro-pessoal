const { obterCategoria } = require("../../repository/categorias");
const transactionsRepository = require("../../repository/transacoes");

const atualizar = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const transacao_id = Number(req.params.id);

  try {
    const transacao_usuario =
      await transactionsRepository.detalharTransacaoUsuario(
        req.userTokenID,
        transacao_id
      );

    if (transacao_usuario.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Transação do usuário não encontrada." });
    }

    const existeCategoria = await obterCategoria(categoria_id);

    if (existeCategoria.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não existe categoria para o id informado." });
    }

    await transactionsRepository.atualizarTransacaoUsuario(
      transacao_id,
      descricao,
      valor,
      data,
      categoria_id,
      tipo
    );

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = atualizar;
