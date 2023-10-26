const jwt_user_token = require("../data/jwt_user_token");
const bcrypt = require("bcrypt");
const sql_users = require("../db/sql_users");

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Por favor informe todos os campos." });
  }

  try {
    const resultado = await sql_users.verificarUsuario(email);

    if (resultado.rowCount > 0) {
      return res.status(404).json({
        mensagem: "Já existe usuário cadastrado com o email informado",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await sql_users.cadastrarUsuario(
      nome,
      email,
      senhaCriptografada
    );

    const resposta = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    return res.status(201).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno!" });
  }
};
const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Email e senha devem ser informados." });
  }

  try {
    const usuario = await sql_users.verificarUsuario(email);

    if (usuario.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const checkPassword = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!checkPassword) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const token = jwt_user_token.sign({ id: usuario.rows[0].id });
    return res.status(201).json({
      usuario: {
        id: usuario.rows[0].id,
        nome: usuario.rows[0].nome,
        email: usuario.rows[0].email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

const detalhar = async (req, res) => {
  try {
    const usuario = await sql_users.detalharUsuario(req.userTokenID);

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

const atualizar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Nome, e-mail senha devem ser informados" });
  }

  try {
    const verificarEmail = await sql_users.verificarUsuario(email);

    if (verificarEmail.rowCount === 0) {
      const senhaEncriptada = await bcrypt.hash(senha, 10);
      await sql_users.atualizarUsuario(
        req.userTokenID,
        nome,
        email,
        senhaEncriptada
      );
    } else if (verificarEmail.rowCount > 0) {
      if (req.userTokenID === verificarEmail.rows[0].id) {
        const senhaEncriptada = await bcrypt.hash(senha, 10);
        await sql_users.atualizarUsuario(
          req.userTokenID,
          nome,
          email,
          senhaEncriptada
        );
      } else {
        return res.status(400).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário",
        });
      }
    }
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = {
  cadastrar,
  login,
  detalhar,
  atualizar,
};
