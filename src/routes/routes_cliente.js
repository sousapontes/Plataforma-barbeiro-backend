const express = require('express');
const routerCliente = express.Router();

const clientes = require('../controllers/controllersCliente')


routerCliente.post('/cliente', clientes.cadastroCliente);
routerCliente.get('/listaCliente', clientes.ListCliente);

module.exports = routerCliente;