const Servico = require('../models/service');

// Lista todos os serviços
exports.getServicos = async (req, res) => {
    try {
        const servicos = await Servico.findAll();
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar serviços', error });
    }
};

// Detalha um serviço específico
exports.getServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });
        return res.status(200).json(servico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter serviço', error });
    }
};

// Adiciona um novo serviço
exports.createServico = async (req, res) => {
    const { tipo, preco, duracao, status } = req.body;
    try {
        const newServico = await Servico.create({ tipo, preco, duracao, status });
        return res.status(201).json(newServico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar serviço', error });
    }
};

// Atualiza um serviço
exports.updateServico = async (req, res) => {
    const { id } = req.params;
    const { tipo, preco, duracao, status } = req.body;
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });

        servico.tipo = tipo || servico.tipo;
        servico.preco = preco || servico.preco;
        servico.duracao = duracao || servico.duracao;
        servico.status = status || servico.status;
        await servico.save();
        
        return res.status(200).json(servico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar serviço', error });
    }
};

// Remove um serviço
exports.deleteServico = async (req, res) => {
    const { id } = req.params;
    try {
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });

        await servico.destroy();
        return res.status(200).json({ message: 'Serviço removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover serviço', error });
    }
};
