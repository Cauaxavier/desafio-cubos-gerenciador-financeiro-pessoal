const { Pool } = require("pg");
const { db } = require("../services/conexao_postgresql");

const pool = new Pool(db);

module.exports = {
  async listarTransacoesUsuario(id) {
    const sql = `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
        FROM transacoes t
        LEFT JOIN categorias c ON t.categoria_id = c.id where usuario_id = $1`;
    const values = [id];
    const { rows } = await pool.query(sql, values);
    return rows;
  },

  async detalharTransacaoUsuario(usuario_id, transacao_id) {
    const sql = `  SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
    FROM transacoes t
    LEFT JOIN categorias c ON t.categoria_id = c.id where usuario_id = $1 AND t.id = $2`;
    const values = [usuario_id, transacao_id];
    const { rows } = await pool.query(sql, values);
    return rows;
  },

  async cadastrarTransacaoUsuario(
    usuario_id,
    descricao,
    valor,
    data,
    categoria_id,
    tipo
  ) {
    const sql = ` insert into transacoes 
    (descricao, valor, data, categoria_id, usuario_id, tipo)
    VALUES
    ($1, $2, $3, $4, $5, $6) returning *`;
    const values = [descricao, valor, data, categoria_id, usuario_id, tipo];
    const { rows } = await pool.query(sql, values);
    return rows;
  },

  async atualizarTransacaoUsuario(
    transacao_id,
    descricao,
    valor,
    data,
    categoria_id,
    tipo
  ) {
    const sql = `update transacoes set descricao = $1, valor = $2, 
    data = $3, categoria_id = $4, tipo = $5 where id = $6`;
    const values = [descricao, valor, data, categoria_id, tipo, transacao_id];
    await pool.query(sql, values);
  },

  async excluirTransacaoUsuario(transacao_id) {
    const sql = `delete from transacoes where id = $1`;
    const values = [transacao_id];
    await pool.query(sql, values);
  },

  async obterExtratoTransacao(usuario_id) {
    const sql = `select tipo, sum(valor) as soma from transacoes where usuario_id = $1 GROUP BY tipo`;
    const values = [usuario_id];
    const { rows } = await pool.query(sql, values);
    return rows;
  },
};
