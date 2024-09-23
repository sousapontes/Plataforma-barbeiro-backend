const express = require('express');
const app = express();

const sequelize = require('./models/index.js')

require('dotenv').config();

// listas de importações do arquivos de rotas
const rotasbarbeiro = require('./routes/routes_barbers.js')
const rotaslogin = require('./routes/routes_login.js')
 

const port = process.env.PORT || 3000;

app.use(express.json());



// Defina suas rotas aqui
// app.use('/api', require('./routes/api'));
app.use('/', rotasbarbeiro);
app.use('/', rotaslogin);



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}: http://localhost:${port}`);
});