const express = require('express');
const router = express.Router();
const barbeiroController = require('../controllers/barbeiro.controller');
const { autenticarToken } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Lista todos os barbeiros
router.get('/barbeiros', barbeiroController.getBarbeiros);

// Obtém um barbeiro específico
router.get('/barbeiro/:id', barbeiroController.getBarbeiroById);

// Cadastra um novo barbeiro (admin)
router.post('/barbeiro', autenticarToken, authorize('admin'), barbeiroController.createBarbeiro);

// Atualiza dados de um barbeiro (admin)
router.put('/barbeiro/:id', autenticarToken, authorize('admin'), barbeiroController.updateBarbeiro);

// Remove um barbeiro (admin)
router.delete('/barbeiro/:id', autenticarToken, authorize('admin'), barbeiroController.deleteBarbeiro);

module.exports = router;

