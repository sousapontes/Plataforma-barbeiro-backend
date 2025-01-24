const express = require('express');
const app = express();
const cors = require('cors')

const sequelize = require('./models/index.js')

app.use(cors())

require('dotenv').config();

// listas de importações do arquivos de rotas
const routes_agendamento = require('./routes/routes_agendamento.js')
const routes_autenticação = require('./routes/routes_autenticação.js')
const routes_barbearia = require('./routes/routes_barbearia.js')
const routes_barbers = require('./routes/routes_barbers.js')
const routes_services = require('./routes/routes_services.js')
const routes_uploadfile = require('../src/middleware/UploadFile.js')
 

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Defina suas rotas aqui
// app.use('/api', require('./routes/api'));
app.use('/', routes_agendamento);
app.use('/', routes_autenticação);
app.use('/', routes_barbearia);
app.use('/', routes_barbers);
app.use('/', routes_services);
app.use('/', routes_uploadfile);



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}: http://localhost:${port}`);
});