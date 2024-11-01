const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rotas para CRUD de itens

// Obter todos os itens de um estabelecimento
router.get('/estabelecimento/:estabelecimentoId', itemController.getAllItems);

// Obter um item específico pelo ID
router.get('/:id', itemController.getItemById);

// Criar um novo item
router.post('/', itemController.createItem);

// Atualizar um item existente
router.put('/:id', itemController.updateItem);

// Deletar um item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
