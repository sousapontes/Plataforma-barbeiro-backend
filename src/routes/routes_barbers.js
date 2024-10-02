const express = require('express');
const router = express.Router();
const barbeiroController = require('../controllers/barbeiro.controller');
const { autenticarToken } = require('../middleware/auth');

// Lista todos os barbeiros
router.get('/barbeiros', barbeiroController.getBarbeiros);

// Obtém um barbeiro específico
router.get('/barbeiro/:id', barbeiroController.getBarbeiroById);

// Cadastra um novo barbeiro (rota protegida)
router.post('/barbeiro', autenticarToken, barbeiroController.createBarbeiro);

// Atualiza dados de um barbeiro (rota protegida)
router.put('/barbeiro/:id', autenticarToken, barbeiroController.updateBarbeiro);

// Remove um barbeiro (rota protegida para admin)
router.delete('/barbeiro/:id', autenticarToken, barbeiroController.deleteBarbeiro);

module.exports = router;
