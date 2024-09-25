const pool = require('../models'); // Database connection
const { where } = require('sequelize');
const token = require('../Utils/jwt')


exports.NewBarbeiro = async (req, res) => {
    const { nome_barbeiro, localizacao_barbeiro, contacto_barbeiro, descricao_barbeiro, data_nascimento,
        Link_Rede_Socias,especialidade, experiencia } = req.body;

    if(!nome_barbeiro || !localizacao_barbeiro || !descricao_barbeiro || !data_nascimento || !experiencia){
        return res.send('Preencha os campos obrigatórios!')
    }
    
    try {
        // Check if nomes already exists
        const NameUserExists = await pool.Barber.findOne({ where: {  nome_barbeiro: nome_barbeiro } });
        if ( NameUserExists) {
            return res.status(400).json({ msg: 'Dados inválidos' });
        }
        
        // Insert barber into database
        const newBarbeiro = await pool.Barber.create({nome_barbeiro, localizacao_barbeiro, contacto_barbeiro,
            descricao_barbeiro, data_nascimento, Link_Rede_Socias, especialidade, experiencia })

            return res.send('cadastrado com sucesso!') 
            return res.json(newBarbeiro)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
   
};

/*
exports.listBarbeiro = async (req,res) => {
    await pool.Barber.findAll().then((listabarbers) => {
        res.json({
            msg:'Listas de Barbeiros Na Plataforma',
            listabarbers
        })
    })
};


exports.AtualizarBarbeiro = async (req,res) => {
    const id = req.params.id;
    const {name, email, phone, password, specialty, experience} = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
     
    await pool.Barber.update({name, email, phone, password:hashedPassword, specialty, experience}, {where: {id: id}}).then((dados) => {
        res.status(200).json({
            msg: 'Barbeiro Atualizado com Sucesso',
            dados
        })
    }).catch((err) => {
        res.status(500).json({
            msg: 'Erro ao Atualizar Barbeiro'
        })
    })
}


exports.DeleteBarbeiro = async (req,res) => {
    const id = req.params.id;
    await pool.Barber.destroy({where: {id: id}}).then(() =>{
        res.status(200).json({
            msg: 'Barbeiro Deletado com Sucesso'
            })
    }).catch((err) => {
        res.status(500).json({
            msg: 'Erro ao Deletar Barbeiro'
        })
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Procurando o barbeiro com o email informado
        const barber = await pool.Barber.findOne({ where: { email } });
        if (!barber) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Comparando a senha fornecida com o hash da senha no banco de dados
        const isValid = await bcrypt.compare(password, barber.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Gerando o token (ajuste conforme sua implementação de token)
        const tokens = token.generateToken({ id: barber.id, email: barber.email });
        // Respondendo com o token
        res.json({ tokens });
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor', details: err.message });
    }
};
*/
  

