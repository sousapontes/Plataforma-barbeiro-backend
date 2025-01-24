const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');
const { autenticarToken } = require('../middleware/auth');
const {authorize} = require('../middleware/role');

// Lista todos os agendamentos de um cliente ou barbeiro
router.get('/agendamentos', autenticarToken, authorize('admin','user'), agendamentoController.getAgendamentos);

// Detalha um agendamento específico
router.get('/agendamento/:id', autenticarToken, authorize('admin','user'), agendamentoController.getAgendamentoById);

// Cria um novo agendamento (rota protegida)
router.post('/agendamento', autenticarToken, authorize('admin','user'), agendamentoController.createAgendamento);

// Atualiza um agendamento (alterar horário, status, etc.)
router.put('/agendamento/:id', autenticarToken, authorize('admin','user'), agendamentoController.updateAgendamento);

// Cancela um agendamento (rota protegida para admin)
router.delete('/agendamento/:id', autenticarToken, authorize('admin','user'), agendamentoController.deleteAgendamento);

module.exports = router;

