const Item = require('../models/itemModel');

const getAllItems = async (req, res) => {
  const { estabelecimentoId } = req.params;
  try {
    const items = await Item.getAll(estabelecimentoId);
    res.json(items);
  } catch (err) {
    console.error('Erro ao obter itens:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.getById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item não encontrado');
    }
  } catch (err) {
    console.error('Erro ao obter item:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

const createItem = async (req, res) => {
  const newItem = req.body;
  try {
    const createdItem = await Item.create(newItem);
    res.status(201).json(createdItem);
  } catch (err) {
    console.error('Erro ao criar item:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  try {
    const result = await Item.update(id, updatedItem);
    if (result.rowCount === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.json('Item atualizado com sucesso!');
    }
  } catch (err) {
    console.error('Erro ao atualizar item:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Item.delete(id);
    if (result.rowCount === 0) {
      res.status(404).send('Item não encontrado');
    } else {
      res.json('Item deletado com sucesso!');
    }
  } catch (err) {
    console.error('Erro ao deletar item:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
