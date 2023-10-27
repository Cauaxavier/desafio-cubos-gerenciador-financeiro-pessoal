const user_authentication = require("../middlewares/autenticacao_usuario");
const transactionController = require("../controllers/transacoes");
const categoriesController = require("../controllers/categorias");
const userController = require("../controllers/usuarios");

const router = require("express").Router();

router.post("/login", userController.login);
router.post("/usuario", userController.cadastrar);

router.use(user_authentication);

router.get("/usuario", userController.detalhar);
router.put("/usuario", userController.atualizar);
router.get("/categoria", categoriesController.listar);
router.get("/transacao", transactionController.listar);
router.post("/transacao", transactionController.cadastrar);
router.get("/transacao/extrato/", transactionController.obterExtrato);
router.put("/transacao/:id", transactionController.atualizar);
router.get("/transacao/:id", transactionController.detalhar);
router.delete("/transacao/:id", transactionController.excluir);

module.exports = router;
