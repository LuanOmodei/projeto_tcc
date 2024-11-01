const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');

// Rotas para CRUD de estabelecimentos
router.get('/', estabelecimentoController.getAllEstabelecimentos);
router.get('/:id', estabelecimentoController.getEstabelecimentoById);
router.post('/', estabelecimentoController.createEstabelecimento);
router.put('/:id', estabelecimentoController.updateEstabelecimento);
router.delete('/:id', estabelecimentoController.deleteEstabelecimento);
router.post('/change-password', estabelecimentoController.changePassword);


// Rota de login
router.post('/login', estabelecimentoController.loginEstabelecimento);

module.exports = router;
