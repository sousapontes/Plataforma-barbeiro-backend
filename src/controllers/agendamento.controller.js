const {Agendamento} = require('../models');
const {Barber} = require('../models');
const {Service} = require('../models');
const {User} = require('../models');

// Lista todos os agendamentos de um cliente ou barbeiro
exports.getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({ where: { userId: req.userId } });
        return res.status(200).json(agendamentos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar agendamentos', error });
    }
};

/*/ Acompanhar agendamentos em tempo real
//router.get('/temporeal/agendamentos',
exports.AgendamentoTempoReal = async (req, res) => {
    try {
        const { data, barbeiroId, clienteId } = req.query;
        const filtros = {};
        if (data) filtros.data = data;
        if (barbeiroId) filtros.BarbeiroId = barbeiroId;
        if (clienteId) filtros.ClienteId = clienteId;

        const agendamentos = await Agendamento.findAll({ where: filtros, include: [user, barber, cliente] });
        res.status(200).json(agendamentos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: err.message });
    }
};*/


// Detalha um agendamento específico
exports.getAgendamentoById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });
        return res.status(200).json(agendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter agendamento', error });
    }
};

// Criar um novo agendamento
exports.createAgendamento = async (req, res) => {
    try {
        const { titulo, startTime, endTime, userId, barberId, serviceId } = req.body;

        // Validações
        if (!titulo || !userId || !barberId || !serviceId || !startTime || !endTime ) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Verificar se o cliente, barbeiro e serviço existem
        const cliente = await User.findByPk(userId);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });

        const barbeiro = await Barber.findByPk(barberId);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado.' });

        const servico = await Service.findByPk(serviceId);
        if (!servico) return res.status(404).json({ message: 'Serviço não encontrado.' });

        // Verifica disponibilidade no horário
        const conflitoHorario = await Agendamento.findByPk({
            where: {
                barberId: barberId,
                startTime: startTime,
                endTime: endTime,
            },
        });

        if (conflitoHorario) {
            return res.status(409).json({ message: 'Horário não disponível para este barbeiro.' });
        }

        // Criar o agendamento
        const novoAgendamento = await Agendamento.create({
            titulo,
            startTime,
            userId: userId,
            barberId: barberId,
            serviceId: serviceId
        });
        // Aqui você pode adicionar uma lógica para enviar notificações
        res.status(201).json(novoAgendamento);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar agendamento.', error: err.message });
    }
};


// Alterar agendamento 
exports.AlterarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, startTime, endTime, userId, barberId, serviceId } = req.body;
        const agendamentoAtualizado = await Agendamento.update({ titulo, startTime, endTime, userId, barberId, serviceId }, { where: { id } });
        if (!agendamentoAtualizado[0]) return res.status(404).json({ message: 'Agendamento não encontrado.' });

        // Aqui pode ser integrada uma lógica de notificação para cliente e barbeiro
        res.status(200).json({ message: 'Agendamento atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar agendamento.', error: err.message });
    }
};

// Atualiza um agendamento
exports.updateAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });

        if(status==="cancelado"){status="cancelado"}
        if(status==="concluido"){status="concluido"}

        agendamento.status = status || agendamento.status;
        await agendamento.save();
        
        return res.status(200).json(agendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
    }
};

// Cancela um agendamento
exports.deleteAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
    
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });

        await agendamento.destroy();
        return res.status(200).json({ message: 'Agendamento cancelado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cancelar agendamento', error });
    }
};


/*/ Gerar relatórios
//router.get('/agendamentos/relatorios', 
// Acompanhar agendamentos com validação e paginação
exports.RelatorioAgendamento = async (req, res) => {
    try {
        const { data, barbeiroId, clienteId, page = 1, limit = 10 } = req.query; // Inclui paginação: página e limite de registros
        const filtros = {};

        // Validação dos parâmetros
        if (data && !/^\d{4}-\d{2}-\d{2}$/.test(data)) { // Verifica se a data está no formato YYYY-MM-DD
            return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD.' });
        }
        if (barbeiroId && isNaN(Number(barbeiroId))) { // Verifica se barbeiroId é numérico
            return res.status(400).json({ message: 'O ID do barbeiro deve ser numérico.' });
        }
        if (clienteId && isNaN(Number(clienteId))) { // Verifica se clienteId é numérico
            return res.status(400).json({ message: 'O ID do cliente deve ser numérico.' });
        }

        // Constrói os filtros com base nos parâmetros válidos
        if (data) filtros.data = data;
        if (barbeiroId) filtros.BarbeiroId = barbeiroId;
        if (clienteId) filtros.ClienteId = clienteId;

        // Paginação: Calcula o deslocamento (offset)
        const offset = (page - 1) * limit;

        // Consulta ao banco de dados com filtros, paginação e inclusões
        const agendamentos = await Agendamento.findAndCountAll({
            where: filtros,
            include: [user, barber], // Inclui os relacionamentos
            limit: parseInt(limit), // Limite de registros por página
            offset: parseInt(offset), // Deslocamento (página atual)
            order: [['data', 'ASC']], // Ordena por data em ordem crescente
        });

        // Retorna os agendamentos com informações de paginação
        res.status(200).json({
            agendamentos: agendamentos.rows, // Registros encontrados
            total: agendamentos.count, // Total de registros encontrados
            page: parseInt(page), // Página atual
            pages: Math.ceil(agendamentos.count / limit), // Total de páginas
        });
    } catch (err) {
        // Tratamento de erro
        res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: err.message });
    }
};*/