const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');
const { autenticarToken } = require('../middleware/auth');

// Lista todos os agendamentos de um cliente ou barbeiro
router.get('/agendamentos', autenticarToken, agendamentoController.getAgendamentos);

// Detalha um agendamento específico
router.get('/agendamento/:id', autenticarToken, agendamentoController.getAgendamentoById);

// Cria um novo agendamento (rota protegida)
router.post('/agendamento', autenticarToken, agendamentoController.createAgendamento);

// Atualiza um agendamento (alterar horário, status, etc.)
router.put('/agendamento/:id', autenticarToken, agendamentoController.updateAgendamento);

// Cancela um agendamento (rota protegida)
router.delete('/agendamento/:id', autenticarToken, agendamentoController.deleteAgendamento);

module.exports = router;
