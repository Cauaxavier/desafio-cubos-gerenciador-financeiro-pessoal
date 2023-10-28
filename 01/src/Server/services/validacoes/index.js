const cadastrarUsuario = require("./joiSchemas/cadastrarUsuario");
const loginUsuario = require("./joiSchemas/loginUsuario");
const atualizarUsuario = require("./joiSchemas/atualizarUsuario");
const parametroID = require("./joiSchemas/detalharTransacao");
const cadastrarTransacao = require("./joiSchemas/cadastrarTransacao");
const atualizarTransacao = require("./joiSchemas/atualizarTransacao");

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  parametroID,
  cadastrarTransacao,
  atualizarTransacao,
};
