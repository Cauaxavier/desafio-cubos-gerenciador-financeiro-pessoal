const transactionsRepository = require("../../repository/transacoes");

const obterExtrato = async (req, res) => {
  try {
    const resultado = await transactionsRepository.obterExtratoTransacao(
      req.userTokenID
    );

    let somaEntrada = 0;
    let somaSaida = 0;

    resultado.forEach((element) => {
      if (element.tipo === "entrada") {
        somaEntrada = element.soma;
      } else if (element.tipo === "saída") {
        somaSaida = element.soma;
      }
    });

    const extrato = {
      entrada: somaEntrada.toString(),
      saida: somaSaida.toString(),
    };

    return res.status(200).json(extrato);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = obterExtrato;
