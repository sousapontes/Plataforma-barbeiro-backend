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

// Configura os horários de trabalho de um barbeiro
exports.setHorarioBarbeiro = async (req, res) => {
    const { barberId, day, startTime, endTime } = req.body;

    try {
        const schedule = await Barber.create({ barberId, day, startTime, endTime });
        return res.status(201).json(schedule);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao configurar horários do barbeiro', error });
    }
};



// Lista os horários de trabalho de um barbeiro
exports.getHorariosBarbeiro = async (req, res) => {
    const { barberId } = req.params;

    try {
        const horarios = await Barber.findAll({ where: { barberId } });
        return res.status(200).json(horarios);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar horários do barbeiro', error });
    }
};


// Relatório de atendimentos por barbeiro
exports.getRelatorioAtendimentos = async (req, res) => {
    try {
        const report = await Appointment.findAll({
            attributes: ['barberId', [sequelize.fn('COUNT', sequelize.col('id')), 'totalAtendimentos']],
            group: ['barberId']
        });
        return res.status(200).json(report);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao gerar relatório de atendimentos', error });
    }
};

// Relatório de faturamento
exports.getRelatorioFaturamento = async (req, res) => {
    try {
        const report = await Appointment.findAll({
            attributes: ['serviceId', [sequelize.fn('SUM', sequelize.col('price')), 'faturamentoTotal']],
            group: ['serviceId']
        });
        return res.status(200).json(report);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao gerar relatório de faturamento', error });
    }
};



/* Aprovar ou rejeitar registro de barbeiros
exports.StatusBarbeiro = async (req, res) => {
    try {
        const { status } = req.body; // Exemplo: { status: 'approved' } ou { status: 'rejected' }
        const updatedBarber = await Barber.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedBarber) return res.status(404).json({ message: 'Barbeiro não encontrado.' });
        res.status(200).json(updatedBarber);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao aprovar/rejeitar barbeiro.', error: err.message });
    }
};*/