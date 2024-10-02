const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacao.controller');
const { autenticarToken } = require('../middleware/auth');

// Cliente avalia uma barbearia
router.post('/barbearia/:id/avaliar', autenticarToken, avaliacaoController.getAvaliacoesBarbearia);

// Cliente avalia um barbeiro
router.post('/barbeiro/:id/avaliar', autenticarToken, avaliacaoController.getAvaliacoesBarbeiro);

// Cliente avalia um serviço
router.post('/servico/:id/avaliar', autenticarToken, avaliacaoController.avaliarBarbeiro);

//
router.post('/servico/:id/avaliar', autenticarToken, avaliacaoController.avaliarBarbeiro);

module.exports = router;
