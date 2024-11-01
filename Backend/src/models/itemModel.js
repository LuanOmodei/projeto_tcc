const pool = require('../db');

const Item = {
  getAll: async (estabelecimentoId) => {
    const result = await pool.query(
      'SELECT * FROM itens WHERE estabelecimento_id = $1 ORDER BY id',
      [estabelecimentoId]
    );
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM itens WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (item) => {
    const {
      nome,
      descricao,
      preco,
      categoria,
      imagem,
      estabelecimento_id,
    } = item;
    const result = await pool.query(
      'INSERT INTO itens (nome, descricao, preco, categoria, imagem, estabelecimento_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, descricao, preco, categoria, imagem, estabelecimento_id]
    );
    return result.rows[0];
  },

  update: async (id, item) => {
    const { nome, descricao, preco, categoria, imagem } = item;
    const result = await pool.query(
      'UPDATE itens SET nome = $1, descricao = $2, preco = $3, categoria = $4, imagem = $5 WHERE id = $6',
      [nome, descricao, preco, categoria, imagem, id]
    );
    return result;
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM itens WHERE id = $1', [id]);
    return result;
  },
};

module.exports = Item;
