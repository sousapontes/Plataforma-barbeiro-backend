const express = require('express');
const router = express.Router();

const barbers = require('../controllers/controllers_Barbers')

router.post('/cadastrarbarbeiro', barbers.NewBarbeiro);
router.get('/listarBarbeiro', barbers.listBarbeiro);

module.exports = router;