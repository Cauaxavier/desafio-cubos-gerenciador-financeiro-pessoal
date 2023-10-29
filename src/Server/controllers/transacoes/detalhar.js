const transactionsRepository = require("../../repository/transacoes");

const detalhar = async (req, res) => {
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

    return res.status(200).json(transacao_usuario);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno.",
    });
  }
};

module.exports = detalhar;
