const express = require('express');
const app = express();

const sequelize = require('./models/index.js')

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());



// Defina suas rotas aqui
// app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});