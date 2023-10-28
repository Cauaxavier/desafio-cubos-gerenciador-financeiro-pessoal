const autenticacao_usuario = require("../middlewares/autenticacao_usuario");
const transactionController = require("../controllers/transacoes");
const categoriesController = require("../controllers/categorias");
const userController = require("../controllers/usuarios");
const joiValidate = require("../middlewares/validarRequisicao");
const joiSchemas = require("../services/validacoes");

const router = require("express").Router();

router.post(
  "/login",
  joiValidate.validarCorpo(joiSchemas.loginUsuario),
  userController.login
);
router.post(
  "/usuario",
  joiValidate.validarCorpo(joiSchemas.cadastrarUsuario),
  userController.cadastrar
);

router.use(autenticacao_usuario);

router.get("/usuario", userController.detalhar);
router.put(
  "/usuario",
  joiValidate.validarCorpo(joiSchemas.atualizarUsuario),
  userController.atualizar
);
router.get("/categoria", categoriesController.listar);
router.get("/transacao", transactionController.listar);
router.post(
  "/transacao",
  joiValidate.validarCorpo(joiSchemas.cadastrarTransacao),
  transactionController.cadastrar
);
router.get("/transacao/extrato/", transactionController.obterExtrato);
router.put(
  "/transacao/:id/atualizar",
  joiValidate.validarParams(joiSchemas.parametroID),
  joiValidate.validarCorpo(joiSchemas.atualizarTransacao),
  transactionController.atualizar
);
router.get(
  "/transacao/:id/detalhar",
  joiValidate.validarParams(joiSchemas.parametroID),
  transactionController.detalhar
);
router.delete(
  "/transacao/:id/excluir",
  joiValidate.validarParams(joiSchemas.parametroID),
  transactionController.excluir
);

module.exports = router;
