const usersRepository = require("../../repository/usuarios");

const detalhar = async (req, res) => {
  try {
    const usuario = await usersRepository.detalharUsuario(req.userTokenID);

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = detalhar;
