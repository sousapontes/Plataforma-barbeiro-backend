const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servico.controller');
const { autenticarToken } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Lista todos os serviços
router.get('/servicos', autenticarToken, authorize('admin'), servicoController.getServicos);

// Detalha um serviço específico
router.get('/servico/:id', autenticarToken, authorize('admin'), servicoController.getServicoById);

// Listar serviços de uma barbearia específica
router.get('/barbearias/:barberShopId/servicos', autenticarToken, authorize('admin'), servicoController.ListarServicoBarbeariaEspecifica) 

// Detalha um Servico Especifico de uma Barbearia
router.get('/servico/:id', autenticarToken, authorize('admin'), servicoController.ServicoEspecificoBarbearia);

// Adiciona um novo serviço (admin)
router.post('/servico', autenticarToken, authorize('admin'), servicoController.createServico);

// Atualiza as informações de um serviço (admin)
router.put('/servico/:id', autenticarToken, authorize('admin'), servicoController.updateServico);

// Remove um serviço (admin)
router.delete('/servico/:id', autenticarToken, authorize('admin'), servicoController.deleteServico);

module.exports = router;
