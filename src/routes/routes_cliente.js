const express = require('express');
const routerCliente = express.Router();

const clientes = require('../controllers/controllersCliente')


routerCliente.post('/cliente', clientes.cadastroCliente);

module.exports = routerCliente;