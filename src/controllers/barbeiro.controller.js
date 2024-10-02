const Barbeiro = require('../models/barber');

// Lista todos os barbeiros
exports.getBarbeiros = async (req, res) => {
    try {
        const barbeiros = await Barbeiro.findAll();
        return res.status(200).json(barbeiros);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar barbeiros', error });
    }
};

// Obtém um barbeiro específico
exports.getBarbeiroById = async (req, res) => {
    const { id } = req.params;
    try {
        const barbeiro = await Barbeiro.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado' });
        return res.status(200).json(barbeiro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter barbeiro', error });
    }
};

// Cadastra um novo barbeiro
exports.createBarbeiro = async (req, res) => {
    const { name, contact, specialty } = req.body;
    try {
        const newBarbeiro = await Barbeiro.create({ name, contact, specialty });
        return res.status(201).json(newBarbeiro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar barbeiro', error });
    }
};

// Atualiza um barbeiro
exports.updateBarbeiro = async (req, res) => {
    const { id } = req.params;
    const { name, contact, specialty } = req.body;
    try {
        const barbeiro = await Barbeiro.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado' });

        barbeiro.name = name || barbeiro.name;
        barbeiro.contact = contact || barbeiro.contact;
        barbeiro.specialty = specialty || barbeiro.specialty;
        await barbeiro.save();
        
        return res.status(200).json(barbeiro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar barbeiro', error });
    }
};

// Remove um barbeiro
exports.deleteBarbeiro = async (req, res) => {
    const { id } = req.params;
    try {
        const barbeiro = await Barbeiro.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado' });

        await barbeiro.destroy();
        return res.status(200).json({ message: 'Barbeiro removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover barbeiro', error });
    }
};
