const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servico.controller');
const { autenticarToken } = require('../middleware/auth');

// Lista todos os serviços
router.get('/servicos', servicoController.getServicos);

// Detalha um serviço específico
router.get('/servico/:id', servicoController.getServicoById);

// Adiciona um novo serviço (rota protegida)
router.post('/servico', autenticarToken, servicoController.createServico);

// Atualiza as informações de um serviço (rota protegida)
router.put('/servico/:id', autenticarToken, servicoController.updateServico);

// Remove um serviço (rota protegida para admin)
router.delete('/servico/:id', autenticarToken, servicoController.deleteServico);

module.exports = router;
