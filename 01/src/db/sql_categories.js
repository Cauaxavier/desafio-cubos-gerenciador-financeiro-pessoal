const { Pool } = require("pg");
const { db } = require("../utils/postgresql_connection");

const pool = new Pool(db);

module.exports = {
  async listarCategorias() {
    const sql = `select * from categorias`;
    const { rows } = await pool.query(sql);
    return rows;
  },

  async obterCategoria(id) {
    const sql = `select * from categorias where id = $1`;
    const categoria = await pool.query(sql, [id]);
    return categoria;
  },
};
