const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const checkRole = require('../middleware/checkRole');

// Rota para login
router.post('/login', authController.login);

// Rota para cadastro
router.post('/register', authController.register);

// (Opcional) Rota para logout
router.post('/logout', authController.logout);

// Rota que apenas admins podem acessar
router.get('/admin', checkRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Bem-vindo, Admin!' });
  });

module.exports = router;
