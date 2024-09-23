const pool = require('../models'); // Database connection
const { where } = require('sequelize');
const token = require('../Utils/jwt')


exports.NewBarbeiro = async (req, res) => {
    const { name_barbeiro, Localizacao_Barbeario, 
        Descricao_Barbeiro, Data_Nascimento,  Especialidade,
        Experiencia} = req.body;

    if(!name_barbeiro || !Localizacao_Barbeario || !Descricao_Barbeiro || !Data_Nascimento || !Especialidade || !Experiencia){
        return res.send('Campos obrigatorios!')
    }
    
    try {
        // Check if email already exists
        const NameUserExists = await pool.Barber.findOne({ where: {  name_barbeiro: name_barbeiro } });
        if ( NameUserExists) {
            return res.status(400).json({ msg: 'Name already registered' });
        }
        
        // Insert barber into database
        const newBarbeiro = await pool.Barber.create({name_barbeiro, Localizacao_Barbeario, 
            Descricao_Barbeiro, Data_Nascimento,  
            Especialidade, Experiencia, })
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


  
// POST /availability: Para o barbeiro definir seus horários de trabalho.

exports.availability = async (req, res) => {
    const { barber_id, day, start_time, end_time } = req.body;

    if(!barber_id){
        return res.send('campo obrigatorio!')
    }
    if(!day){
        return res.send('campo obrigatorio!')
    }
    if(!start_time){
        return res.send('campo obrigatorio!')
    }
    if(!end_time){
        return res.send('campo obrigatoria!')
    }
    
    try {
        const availability = await pool.Barber.create({
            barber_id,
            day,
            start_time,
            end_time,
        });
        return res.status(201).json(availability);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar disponibilidade' });
    }
};


// GET /availability: Para o barbeiro visualizar seus horários disponíveis.

exports.ViewAvailability = async (req, res) => {
    const barber_id = req.params.id; // assuming req.barber is set by middleware

    try {
        const availabilities = await pool.Barber.findAll({
            where: { barber_id },
        });
        res.json(availabilities);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar disponibilidade' });
    }
};
*/
