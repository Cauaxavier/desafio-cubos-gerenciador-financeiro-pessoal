const bcrypt = require("bcrypt");
const usersRepository = require("../../repository/usuarios");

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const resultado = await usersRepository.verificarUsuario(email);

    if (resultado.rowCount > 0) {
      return res.status(404).json({
        mensagem: "Já existe usuário cadastrado com o email informado",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await usersRepository.cadastrarUsuario(
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

module.exports = cadastrar;
