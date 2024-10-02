const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rota para login
router.post('/login', authController.login);

// Rota para cadastro
router.post('/register', authController.register);

// (Opcional) Rota para logout
router.post('/logout', authController.logout);

module.exports = router;
