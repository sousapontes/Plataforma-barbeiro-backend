const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { autenticarToken } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Página inicial
router.get('/landPage', authController.landingPage);

// Listar todos os Utilizadores
router.get('/utilizadores', autenticarToken, authorize('admin'), authController.getUtilizadores);

// Buscar por um utilizador especifico
router.get('/utilizador/:id', autenticarToken, authorize('admin'), authController.getUtilizadoresById);

// Rota para login
router.post('/login', authController.login);

// Rota para cadastro
router.post('/register', authController.register);

// atualizar utilizador
router.put('/utilizador/:id', autenticarToken, authorize('admin','user'), authController.updateUtilizadores);

// Deletar utilizador
router.delete('/utilizador/:id', autenticarToken, authorize('admin'), authController.deleteUtilizadores);

// (Opcional) Rota para logout
router.post('/logout', autenticarToken, authorize('admin','user'),authController.logout);

module.exports = router;

