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
     
    const idExist = await pool.Tabela_Clientes.findOne({where:{ id:id }})

    if(!idExist){
        res.status(400).json({msg:'dados inválidos,'})
    }

    await pool.Tabela_Clientes.update({Name_Cliente, Email, Contacto_Cliente, Morada_Cliente, Data_Nascimento,
        Preferencia_Cliente, Avaliacao}, {where: {id: id}}).then((dados) => {
        res.status(200).json({msg: 'Atualizado com Sucesso!',dados})
    }).catch((err) => {
        res.status(500).json({
            msg: 'Erro a Atualizar Cliente'
        })
    })
}

exports.deletarCliente = async (req,res) => {
    const id = req.params.id;
    await pool.Tabela_Clientes.destroy({where: {id: id}}).then((dados) =>{
        res.status(200).json({msg:'Dados deletado com sucesso'});
    }).catch(err,()=>{
        res.status().json({err: 'Erro ao deletar os dados!'})
    })
}


// Função para obter o histórico de serviços e agendamentos
exports.historicoAgendamentos = async (req, res) => {
    try {
        // ID do cliente autenticado
        const clienteId = req.user.id;

        // Buscar agendamentos do cliente com data anterior à data atual
        const historicoAgendamentos = await pool.Agendamento.findAll({
            where: {
                fk_Cliente: clienteId,
                Status_Agendamento: 'concluído', // Ou qualquer outro status que você use para indicar finalizado
                Dia_de_realização_de_serviço: {
                    [Op.lt]: new Date(), // Agendamentos anteriores a hoje
                },
            },
            include: [
                {
                    model: Service,
                    as: 'servico',
                    attributes: ['tipo_servico', 'preço_serviço', 'Duração_Servico'],
                },
                {
                    model: Barber,
                    as: 'barbeiro',
                    attributes: ['nome_barbeiro', 'especialidade'],
                },
                {
                    model: Barbearia,
                    as: 'barbearia',
                    attributes: ['Nome_Barbearia', 'Localização_Barbearia'],
                },
            ],
        });

        // Se não houver agendamentos
        if (!historicoAgendamentos.length) {
            return res.status(404).json({ message: 'Nenhum histórico de agendamentos encontrado.' });
        }

        // Retornar o histórico de agendamentos
        return res.status(200).json(historicoAgendamentos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar histórico de agendamentos.' });
    }
};
