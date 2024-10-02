const express = require('express');
const router = express.Router();
const barbeariaController = require('../controllers/barbearia.controller');
const { autenticarToken } = require('../middleware/auth');

// Lista todas as barbearias
router.get('/barbearias', barbeariaController.getBarbearias);

// Obtém uma barbearia específica
router.get('/barbearia/:id', barbeariaController.getBarbeariaById);

// Cadastra uma nova barbearia (rota protegida)
router.post('/barbearia', autenticarToken, barbeariaController.createBarbearia);

// Atualiza dados de uma barbearia (rota protegida)
router.put('/barbearia/:id', autenticarToken, barbeariaController.updateBarbearia);

// Remove uma barbearia (rota protegida para admin)
router.delete('/barbearia/:id', autenticarToken, barbeariaController.deleteBarbearia);

module.exports = router;
