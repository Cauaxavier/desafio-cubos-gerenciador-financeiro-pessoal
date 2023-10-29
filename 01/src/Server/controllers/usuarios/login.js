const jwt_user_token = require("../../services/jwt_token_usuario");
const bcrypt = require("bcrypt");
const usersRepository = require("../../repository/usuarios");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await usersRepository.verificarUsuario(email);

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

module.exports = login;
