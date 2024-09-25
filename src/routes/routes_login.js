const express = require('express');
const router = express.Router();

const logins = require('../controllers/controllerLogin.js')

router.post('/login', logins.login);

module.exports = router;