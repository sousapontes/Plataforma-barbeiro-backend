const express = require('express');
const router = express.Router();
const barbeariaController = require('../controllers/barbearia.controller');
const { autenticarToken } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Lista todas as barbearias
router.get('/barbearias', barbeariaController.getBarbearias);

// Obtém uma barbearia específica
router.get('/barbearia/:id', barbeariaController.getBarbeariaById);

// Cadastra uma nova barbearia (admin)
router.post('/barbearia', autenticarToken, authorize('admin'), barbeariaController.createBarbearia);

// Atualiza dados de uma barbearia (admin)
router.put('/barbearia/:id', autenticarToken, authorize('admin'), barbeariaController.updateBarbearia);

// Remove uma barbearia (admin)
router.delete('/barbearia/:id', autenticarToken, authorize('admin'), barbeariaController.deleteBarbearia);

module.exports = router;

