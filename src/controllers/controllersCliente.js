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
    }catch(err){
        return res.status(500).json({ message: "Erro No Servidor Interno!" });
    }
}


exports.ListCliente = async (req,res) =>{
    try {
         await pool.Tabela_Clientes.findAll().then((clientes)=>{
            return res.json(clientes);
         });
    }catch(err){
        return res.status(401).json({err:'utilizador não encontrado'})
    }
}

exports.AtualizarCliente = async (req,res) => {
    const id = req.params.id;
    const { Name_Cliente, Email, Contacto_Cliente, Morada_Cliente, Data_Nascimento,
        Preferencia_Cliente, Avaliacao } = req.body;
     
    await pool.Tabela_Clientes.update({Name_Cliente, Email, Contacto_Cliente, Morada_Cliente, Data_Nascimento,
        Preferencia_Cliente, Avaliacao}, {where: {id: id}}).then((dados) => {
        res.status(200).json({
            msg: 'Atualizado com Sucesso!',
            dados
        })
    }).catch((err) => {
        res.status(500).json({
            msg: 'Erro ao Atualizar Barbeiro'
        })
    })
}