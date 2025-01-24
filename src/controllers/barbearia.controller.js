const { Barbearia } = require('../models');

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
        return res.status(500).json({ message: 'Erro ao obter barbearia' });
    }
};

// Cadastra uma nova barbearia
exports.createBarbearia = async (req, res) => {
    const { name, address, phone } = req.body;

    try {
        if (!name || !address || !phone) {
            return res.status(400).json({ message: 'Preencha todos os campos, por favor!' });
        }

        const newBarbearia = await Barbearia.create({ name, address, phone });
        return res.status(201).json(newBarbearia);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro ao criar barbearia, por favor tente novamente mais tarde!' });
    }
};

// Atualiza uma barbearia
exports.updateBarbearia = async (req, res) => {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });

        barbearia.name = name || barbearia.name;
        barbearia.address = address || barbearia.address;
        barbearia.phone = phone || barbearia.phone;

        await barbearia.save();
        return res.status(200).json(barbearia);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar barbearia' });
    }
};

// Deleta uma barbearia
exports.deleteBarbearia = async (req, res) => {
    const { id } = req.params;

    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });

        await barbearia.destroy();
        return res.status(200).json({ message: 'Barbearia deletada com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar barbearia' });
    }
};

// Gerenciar barbeiros associados a uma barbearia
exports.AssociadosBarbearia = async (req, res) => {
    try {
        const barberShop = await Barbearia.findById(req.params.id).populate('barbeiros');
        if (!barberShop) return res.status(404).json({ message: 'Barbearia não encontrada.' });
        res.status(200).json(barberShop.barbeiros);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar barbeiros.', error: err.message });
    }
};
