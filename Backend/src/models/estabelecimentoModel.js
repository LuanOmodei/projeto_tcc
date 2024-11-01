const pool = require('../db');
const bcrypt = require('bcrypt');

const Estabelecimento = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM estabelecimentos ORDER BY id');
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM estabelecimentos WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (estabelecimento) => {
    const { nome, senha, imagem } = estabelecimento;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      'INSERT INTO estabelecimentos (nome, senha, imagem) VALUES ($1, $2, $3) RETURNING *',
      [nome, hashedPassword, imagem]
    );
    return result.rows[0];
  },

  update: async (id, estabelecimento) => {
    const { nome, senha, imagem } = estabelecimento;

    // Se houver uma nova senha, ela deve ser atualizada com hash
    if (senha) {
      await pool.query(
        'UPDATE estabelecimentos SET nome = $1, senha = $2, imagem = COALESCE($3, imagem) WHERE id = $4',
        [nome, senha, imagem || null, id]
      );
    } else {
      await pool.query(
        'UPDATE estabelecimentos SET nome = $1, imagem = COALESCE($2, imagem) WHERE id = $3',
        [nome, imagem || null, id]
      );
    }
  },

  delete: async (id) => {
    await pool.query('DELETE FROM estabelecimentos WHERE id = $1', [id]);
  },
};

module.exports = Estabelecimento;
