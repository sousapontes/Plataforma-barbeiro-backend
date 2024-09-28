const express = require('express');
const routerCliente = express.Router();

const clientes = require('../controllers/controllersCliente')


routerCliente.post('/cliente', clientes.cadastroCliente);
routerCliente.get('/listaCliente', clientes.ListCliente);
routerCliente.get('/atualizaCliente:id', clientes.AtualizarCliente);
routerCliente.get('/deletarCliente:id', clientes.deletarCliente);
routerCliente.get('/historicoAgendamento:id', clientes.historicoAgendamentos);

module.exports = routerCliente;