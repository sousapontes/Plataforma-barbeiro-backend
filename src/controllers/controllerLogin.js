const bcrypt = require('bcrypt');
const pool = require('../models'); // Database connection
const { where } = require('sequelize');
const token = require('../Utils/jwt')


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário no banco de dados
        const user = await pool.Tabela_Clientes.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(404).json({ message: "Dados Inválidos!" });
        }

        // Verifica a senha
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Senha Inválida!" });
        }

        // Protege a senha com bcrypt antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de salt rounds

        // Salva os dados do login no banco de dados
        await pool.Login.create({ email, password: hashedPassword });

        // Gera o token
        const tokens = token.generateToken({ id: user.id, name: user.Name_Cliente });

        // Retorna o token como resposta
        return res.json({ tokens });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro no Servidor Interno!" });
    }
};




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