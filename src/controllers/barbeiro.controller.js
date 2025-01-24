const {Barber} = require('../models');

// Lista todos os barbeiros
exports.getBarbeiros = async (req, res) => {
    try {
        const barbeiros = await Barber.findAll();
        return res.status(200).json(barbeiros);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar barbeiros', error });
    }
};

// Cadastra um novo barbeiro
exports.createBarbeiro = async (req, res) => {
    try {
    const {  name, experience, specialty  } = req.body;

    // Validações
    if ( !name || !experience || !specialty ) {
        return res.status(400).json({ message: 'Preencha todos os campos,que são obrigatórios.' });
    }

        const newBarbeiro = await Barber.create({ name, experience, specialty });
        return res.status(201).json(newBarbeiro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar barbeiro' });
    }
};

// Obtém uma barbeiro específico
exports.getBarbeiroById = async (req, res) => {
    const { id } = req.params;
    try {
        const barbeiro = await Barber.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbearia não encontrada' });
        return res.status(200).json(barbeiro);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter barbearia'});
    }
};

// Atualiza um barbeiro || Editar perfil de barbeiro
exports.updateBarbeiro = async (req, res) => {
    const { id } = req.params;
    const { name, experience, specialty } = req.body;

    try {
        const barbeiro = await Barber.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado' });

        barbeiro.name = name || barbeiro.name;
        barbeiro.experience = experience || barbeiro.experience;
        barbeiro.specialty = specialty || barbeiro.specialty;

        await barbeiro.save();
        return res.status(200).json(barbeiro);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro ao atualizar barbeiro' });
    }
};

// Aprovar ou rejeitar registro de barbeiros
exports.StatusBarbeiro = async (req, res) => {
    try {
        const { status } = req.body; // Exemplo: { status: 'approved' } ou { status: 'rejected' }
        const updatedBarber = await Barber.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedBarber) return res.status(404).json({ message: 'Barbeiro não encontrado.' });
        res.status(200).json(updatedBarber);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao aprovar/rejeitar barbeiro.', error: err.message });
    }
};

// Deleta um barbeiro
exports.deleteBarbeiro = async (req, res) => {
    const { id } = req.params;

    try {
        const barbeiro = await Barber.findByPk(id);
        if (!barbeiro) return res.status(404).json({ message: 'Barbeiro não encontrado' });

        await barbeiro.destroy();
        return res.status(200).json({ message: 'Barbeiro deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar barbeiro', error });
    }
};

