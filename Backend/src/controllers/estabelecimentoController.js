const Estabelecimento = require('../models/estabelecimentoModel');
const bcrypt = require('bcrypt');

exports.getAllEstabelecimentos = async (req, res) => {
  try {
    const estabelecimentos = await Estabelecimento.getAll();
    res.json(estabelecimentos);
  } catch (err) {
    console.error('Erro ao obter estabelecimentos:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.getEstabelecimentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const estabelecimento = await Estabelecimento.getById(id);
    if (estabelecimento) {
      res.json(estabelecimento);
    } else {
      res.status(404).send('Estabelecimento não encontrado');
    }
  } catch (err) {
    console.error('Erro ao obter estabelecimento:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.createEstabelecimento = async (req, res) => {
  const newEstabelecimento = req.body;
  try {
    const createdEstabelecimento = await Estabelecimento.create(newEstabelecimento);
    res.status(201).json(createdEstabelecimento);
  } catch (err) {
    console.error('Erro ao criar estabelecimento:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.updateEstabelecimento = async (req, res) => {
  const { id } = req.params;
  const { nome, senha, imagem } = req.body;

  // Validações básicas
  if (!nome) {
    return res.status(400).json({ error: 'O nome é obrigatório.' });
  }

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (imagem && !urlRegex.test(imagem)) {
    return res.status(400).json({ error: 'URL de imagem inválida.' });
  }

  try {
    let hashedPassword;
    if (senha) {
      hashedPassword = await bcrypt.hash(senha, 10); // Gera o hash da nova senha
    }

    // Atualiza o estabelecimento, com ou sem a nova senha e incluindo a imagem
    await Estabelecimento.update(id, { nome, senha: hashedPassword || undefined, imagem });

    res.json('Estabelecimento atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar estabelecimento:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.deleteEstabelecimento = async (req, res) => {
  const { id } = req.params;
  try {
    await Estabelecimento.delete(id);
    res.json('Estabelecimento deletado com sucesso!');
  } catch (err) {
    console.error('Erro ao deletar estabelecimento:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.loginEstabelecimento = async (req, res) => {
  const { id, senha } = req.body;
  try {
    const estabelecimento = await Estabelecimento.getById(id);
    if (estabelecimento) {
      // Comparação entre a senha fornecida e o hash armazenado
      const match = await bcrypt.compare(senha, estabelecimento.senha);
      if (match) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Senha incorreta' });
      }
    } else {
      res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.changePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;

  try {
    const estabelecimento = await Estabelecimento.getById(id);

    if (!estabelecimento) {
      return res.status(404).json({ error: 'Estabelecimento não encontrado' });
    }

    const match = await bcrypt.compare(currentPassword, estabelecimento.senha);

    if (!match) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await Estabelecimento.update(id, { nome: estabelecimento.nome, senha: hashedNewPassword, imagem: estabelecimento.imagem });

    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao alterar a senha:', err.message);
    res.status(500).send('Erro no servidor');
  }
};
