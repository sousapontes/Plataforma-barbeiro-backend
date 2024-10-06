const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { autenticarToken } = require('../middleware/auth');
const { upload } = require('../middleware/uploaddearquivos');


// Lista todos os clientes cadastrados (admin)
router.get('/clientes', autenticarToken, clienteController.getClientes);

// Obtém detalhes de um cliente específico
router.get('/cliente/:id', autenticarToken, clienteController.getClienteById);

// Cadastra um novo cliente
router.post('/cliente', clienteController.createCliente);

// Atualiza as informações do cliente
router.put('/cliente/:id', autenticarToken, clienteController.updateCliente);

// Remove um cliente (admin)
router.delete('/cliente/:id', autenticarToken, clienteController.deleteCliente);

router.put('/:id/foto', upload.single('foto'), clienteController.updateFotoPerfil);

module.exports = router;
