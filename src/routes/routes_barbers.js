const express = require('express');
const router = express.Router();

const barbers = require('../controllers/controllers_Barbers')

router.post('/cadastrarbarbeiro', barbers.NewBarbeiro);

module.exports = router;