const transactionsRepository = require("../../repository/transacoes");

const excluir = async (req, res) => {
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

    await transactionsRepository.excluirTransacaoUsuario(transacao_id);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = excluir;
