const Agendamento = require('../models/agendamento');

// Lista todos os agendamentos de um cliente ou barbeiro
exports.getAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({ where: { userId: req.userId } });
        return res.status(200).json(agendamentos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar agendamentos', error });
    }
};

// Detalha um agendamento específico
exports.getAgendamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });
        return res.status(200).json(agendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter agendamento', error });
    }
};

// Cria um novo agendamento
exports.createAgendamento = async (req, res) => {
    const { clienteId, barbeiroId, servicoId, data, horario } = req.body;
    try {
        const newAgendamento = await Agendamento.create({ clienteId, barbeiroId, servicoId, data, horario });
        return res.status(201).json(newAgendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
};

// Atualiza um agendamento
exports.updateAgendamento = async (req, res) => {
    const { id } = req.params;
    const { data, horario, status } = req.body;
    try {
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });

        agendamento.data = data || agendamento.data;
        agendamento.horario = horario || agendamento.horario;
        agendamento.status = status || agendamento.status;
        await agendamento.save();
        
        return res.status(200).json(agendamento);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar agendamento', error });
    }
};

// Cancela um agendamento
exports.deleteAgendamento = async (req, res) => {
    const { id } = req.params;
    try {
        const agendamento = await Agendamento.findByPk(id);
        if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrado' });

        await agendamento.destroy();
        return res.status(200).json({ message: 'Agendamento cancelado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cancelar agendamento', error });
    }
};
