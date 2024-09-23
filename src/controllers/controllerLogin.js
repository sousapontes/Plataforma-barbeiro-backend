const bcrypt = require('bcrypt');
const pool = require('../models'); // Database connection
const { where } = require('sequelize');
const token = require('../Utils/jwt')

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.Tabela_Clientes.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Dados Inválidos!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Senha Inválida!" });
        }
         const token = await token.generateToken(user.id);
             res.json({ token });
         } catch (error) {
             res.status(500).json({ message: "Erro No Servidor Interno!" });
         }
}


exports.cadastroCliente = async (req,res) => {
    try {
        const { Name_Cliente,Email, password, password2 } = req.body;

        if(!Name_Cliente || !Email || !password || !password2){
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        if(password != password2){
            return res.status(400).json({ message: "Senhas não conferem!" });
        }

        const user = await pool.Tabela_Clientes.findOne({ where: { Email } });
        const username = await pool.Tabela_Clientes.findOne({ where: { Name_Cliente } });
        if (!user || !username) {
            return res.status(404).json({ message: "Dados já existentes!" });
        }

        const isValidPassword = await bcrypt.hash(password,10);

        const newCliente = await pool.Tabela_Clientes.create({Name_Cliente, Email, password:isValidPassword})
        return res.send('cadastrado com sucesso!') 
        return res.json(newCliente)
    }catch(err){
        return res.status(500).json({ message: "Erro No Servidor Interno!" });
    }
}