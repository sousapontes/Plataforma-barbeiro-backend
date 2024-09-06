const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Utils/jwt.js')

const barbers = require('../controllers/controllers_Barbers')

router.post('/cadastrarbarbeiro', barbers.NewBarbeiro);
router.get('/listarBarbeiro', barbers.listBarbeiro);
router.put('/atualizarBarbeiro/:id', barbers.AtualizarBarbeiro);
router.delete('/deletarBarbeiro/:id', barbers.DeleteBarbeiro);
router.post('/login', barbers.login);
router.get('/rota-protegida', verifyToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.barber.email}` });
});



module.exports = router;