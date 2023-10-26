const { obterCategoria } = require("../db/sql_categories");
const sql_transactions = require("../db/sql_transactions");

const listar = async (req, res) => {
  const { filtro } = req.query;
  try {
    const resultado = await sql_transactions.listarTransacoesUsuario(
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
const detalhar = async (req, res) => {
  const transacao_id = Number(req.params.id);

  try {
    const transacao_usuario = await sql_transactions.detalharTransacaoUsuario(
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
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const atualizar = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const transacao_id = Number(req.params.id);

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios e devem ser informados.",
    });
  }

  try {
    const transacao_usuario = await sql_transactions.detalharTransacaoUsuario(
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

    if (tipo !== "entrada" && tipo !== "saida") {
      return res
        .status(400)
        .json({ mensagem: "O tipo só pode ser 'entrada' ou 'saida'." });
    }

    await sql_transactions.atualizarTransacaoUsuario(
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
const cadastrar = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  if (!tipo || !descricao || !valor || !data || !categoria_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados" });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res
      .status(400)
      .json({ mensagem: "O tipo só pode ser 'entrada' ou 'saida'." });
  }

  try {
    const existeCategoria = await obterCategoria(categoria_id);

    if (existeCategoria.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não existe categoria para o id informado." });
    }

    const cadastroTransacao = await sql_transactions.cadastrarTransacaoUsuario(
      req.userTokenID,
      descricao,
      valor,
      data,
      categoria_id,
      tipo
    );

    const detalharTransação = await sql_transactions.detalharTransacaoUsuario(
      req.userTokenID,
      cadastroTransacao[0].id
    );

    return res.status(201).json(detalharTransação[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

const excluir = async (req, res) => {
  const transacao_id = Number(req.params.id);

  try {
    const transacao_usuario = await sql_transactions.detalharTransacaoUsuario(
      req.userTokenID,
      transacao_id
    );

    if (transacao_usuario.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Transação do usuário não encontrada." });
    }

    await sql_transactions.excluirTransacaoUsuario(transacao_id);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

const obterExtrato = async (req, res) => {
  try {
    const resultado = await sql_transactions.obterExtratoTransacao(
      req.userTokenID
    );

    let somaEntrada = 0;
    let somaSaida = 0;

    resultado.forEach((element) => {
      if (element.tipo === "entrada") {
        somaEntrada = element.soma;
      } else if (element.tipo === "saida") {
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

module.exports = {
  listar,
  detalhar,
  cadastrar,
  atualizar,
  excluir,
  obterExtrato,
};
