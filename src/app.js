const express = require('express');
const app = express();
const sequelize = require('./models/index.js')
const bodyParser = require('body-parser');

// Middleware para tratar JSON
app.use(bodyParser.json());
require('dotenv').config();

// listas de importações do arquivos de rotas
const routes_agendamento = require('./routes/routes_agendamento.js')
const routes_autenticação = require('./routes/routes_autenticação.js')
const routes_avaliações = require('./routes/routes_avaliações.js')
const routes_barbearia = require('./routes/routes_barbearia.js')
const routes_barbers = require('./routes/routes_barbers.js')
const routes_cliente = require('./routes/routes_cliente.js')
const routes_services = require('./routes/routes_services.js')
 

const port = process.env.PORT || 3000;

app.use(express.json());



// Defina suas rotas aqui
// app.use('/api', require('./routes/api'));
app.use('/', routes_agendamento);
app.use('/', routes_autenticação);
app.use('/', routes_avaliações);
app.use('/', routes_barbearia);
app.use('/', routes_barbers);
app.use('/', routes_cliente);
app.use('/', routes_services);



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}: http://localhost:${port}`);
});