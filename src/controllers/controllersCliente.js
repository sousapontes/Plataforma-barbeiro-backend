const bcrypt = require('bcrypt')
const pool = require('../models'); // Database connection
const { where } = require('sequelize');
const token = require('../Utils/jwt');

exports.cadastroCliente = async (req,res) => {
    
    const { Name_Cliente,Email, password, password2 } = req.body;

    if(!Name_Cliente || !Email || !password || !password2){
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    if(password != password2){
        return res.status(400).json({ message: "Senhas não conferem!" });
    }

    const user = await pool.Tabela_Clientes.findOne({ where: { Email } });
    
    if (user) {
        return res.status(404).json({ message: "Dados já existentes!" });
    }

    const isValidPassword = await bcrypt.hash(password,10);

    try {
        const newCliente = await pool.Tabela_Clientes.create({Name_Cliente, Email, password:isValidPassword})
        return res.send('cadastrado com sucesso!') 
        return res.json(newCliente)
    }catch(err){
        return res.status(500).json({ message: "Erro No Servidor Interno!" });
    }
}