const bcrypt = require("bcrypt");
const usersRepository = require("../../repository/usuarios");

const atualizar = async (req, res) => {
  const { nome, email, senha } = req.body;

  // if (!nome || !email || !senha) {
  //   return res
  //     .status(400)
  //     .json({ mensagem: "Nome, e-mail senha devem ser informados" });
  // }

  try {
    const verificarEmail = await usersRepository.verificarUsuario(email);

    if (verificarEmail.rowCount === 0) {
      const senhaEncriptada = await bcrypt.hash(senha, 10);
      await usersRepository.atualizarUsuario(
        req.userTokenID,
        nome,
        email,
        senhaEncriptada
      );
    } else if (verificarEmail.rowCount > 0) {
      if (req.userTokenID === verificarEmail.rows[0].id) {
        const senhaEncriptada = await bcrypt.hash(senha, 10);
        await usersRepository.atualizarUsuario(
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

module.exports = atualizar;
