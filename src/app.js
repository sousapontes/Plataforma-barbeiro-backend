const express = require('express');
const app = express();

const sequelize = require('./config/database')

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());

// Sincronizar o banco de dados
sequelize.sync()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco:', err);
    });

// Defina suas rotas aqui
// app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});