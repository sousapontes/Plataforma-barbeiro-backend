const Barbearia = require('../models/barbearia');

// Lista todas as barbearias
exports.getBarbearias = async (req, res) => {
    try {
        const barbearias = await Barbearia.findAll();
        return res.status(200).json(barbearias);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar barbearias', error });
    }
};

// Obtém uma barbearia específica
exports.getBarbeariaById = async (req, res) => {
    const { id } = req.params;
    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });
        return res.status(200).json(barbearia);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter barbearia', error });
    }
};

// Cadastra uma nova barbearia
exports.createBarbearia = async (req, res) => {
    const { name, location, contact } = req.body;
    try {
        const newBarbearia = await Barbearia.create({ name, location, contact });
        return res.status(201).json(newBarbearia);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar barbearia', error });
    }
};

// Atualiza uma barbearia
exports.updateBarbearia = async (req, res) => {
    const { id } = req.params;
    const { name, location, contact } = req.body;
    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });

        barbearia.name = name || barbearia.name;
        barbearia.location = location || barbearia.location;
        barbearia.contact = contact || barbearia.contact;
        await barbearia.save();
        
        return res.status(200).json(barbearia);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar barbearia', error });
    }
};

// Remove uma barbearia
exports.deleteBarbearia = async (req, res) => {
    const { id } = req.params;
    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });

        await barbearia.destroy();
        return res.status(200).json({ message: 'Barbearia removida com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover barbearia', error });
    }
};
