const controladores_usuarios = require("../controllers/users_controller");
const controladores_categorias = require("../controllers/categories_controller");
const controladores_transacoes = require("../controllers/transactions_controller");
const user_authentication = require("../middlewares/user_authentication");

const router = require("express").Router();

router.post("/login", controladores_usuarios.login);
router.post("/usuario", controladores_usuarios.cadastrar);

router.use(user_authentication);

router.get("/usuario", controladores_usuarios.detalhar);
router.put("/usuario", controladores_usuarios.atualizar);
router.get("/categoria", controladores_categorias.listar);
router.get("/transacao", controladores_transacoes.listar);
router.post("/transacao", controladores_transacoes.cadastrar);
router.get("/transacao/extrato/", controladores_transacoes.obterExtrato);
router.put("/transacao/:id", controladores_transacoes.atualizar);
router.get("/transacao/:id", controladores_transacoes.detalhar);
router.delete("/transacao/:id", controladores_transacoes.excluir);

module.exports = router;
