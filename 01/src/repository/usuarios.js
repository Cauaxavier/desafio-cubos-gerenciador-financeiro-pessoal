const { Pool } = require("pg");
const { db } = require("../services/conexao_postgresql");

const pool = new Pool(db);

module.exports = {
  async cadastrarUsuario(nome, email, senha) {
    const sql = `insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *`;
    const values = [nome, email, senha];
    const { rows } = await pool.query(sql, values);
    return rows[0];
  },

  async verificarUsuario(email) {
    const sql = `select * from usuarios where email = $1`;
    const values = [email];
    const resultado = await pool.query(sql, values);
    return resultado;
  },

  async detalharUsuario(id) {
    const sql = `select id, nome, email from usuarios where id = $1`;
    const values = [id];
    const { rows } = await pool.query(sql, values);
    return rows[0];
  },

  async atualizarUsuario(id, nome, email, senha) {
    const sql = `update usuarios set nome = $1, email = $2, senha = $3 where id = $4 returning *`;
    const values = [nome, email, senha, id];
    const resultado = await pool.query(sql, values);
    return resultado;
  },
};
