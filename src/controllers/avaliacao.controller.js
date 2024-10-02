const Avaliacao = require('../models/avaliacao');

// Avalia uma barbearia
exports.avaliarBarbearia = async (req, res) => {
    const { id } = req.params;
    const { clienteId, nota, comentario } = req.body;
    try {
        const newAvaliacao = await Avaliacao.create({ clienteId, barbeariaId: id, nota, comentario });
        return res.status(201).json(newAvaliacao);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao avaliar barbearia', error });
    }
};

// Avalia um barbeiro
exports.avaliarBarbeiro = async (req, res) => {
    const { id } = req.params;
    const { clienteId, nota, comentario } = req.body;
    try {
        const newAvaliacao = await Avaliacao.create({ clienteId, barbeiroId: id, nota, comentario });
        return res.status(201).json(newAvaliacao);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao avaliar barbeiro', error });
    }
};

// Lista todas as avaliações de uma barbearia
exports.getAvaliacoesBarbearia = async (req, res) => {
    const { id } = req.params;
    try {
        const avaliacoes = await Avaliacao.findAll({ where: { barbeariaId: id } });
        return res.status(200).json(avaliacoes);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar avaliações', error });
    }
};

// Lista todas as avaliações de um barbeiro
exports.getAvaliacoesBarbeiro = async (req, res) => {
    const { id } = req.params;
    try {
        const avaliacoes = await Avaliacao.findAll({ where: { barbeiroId: id } });
        return res.status(200).json(avaliacoes);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar avaliações', error });
    }
};
