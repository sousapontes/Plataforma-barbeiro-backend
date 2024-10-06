const Barbearia = require('../models/barbearia');

// Lista todas as barbearias
exports.getBarbearias = async (req, res) => {
    try {
        const barbearias = await Barbearia.findAll();
        return res.status(200).json('lista de barbearias:',barbearias);
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
    const {  nome_barbearia, contacto_barbearia, imagem_logo_barbearia, localizacao_barbearia, descricao_localizacao,
        dias_funcionamento, horario_atendimento } = req.body;

        if( !nome_barbearia || !contacto_barbearia || !localizacao_barbearia || !descricao_localizacao || !dias_funcionamento
            || !horario_atendimento){
                return res.status().json('Preencha os campos obrigatorios')
            }

    try {
        const newBarbearia = await Barbearia.create({ nome_barbearia, contacto_barbearia, imagem_logo_barbearia, localizacao_barbearia, 
            descricao_localizacao, dias_funcionamento, horario_atendimento });
        return res.status(201).json('Barbearia cadastrada com sucesso!',newBarbearia);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar barbearia', error });
    }
};

// Atualiza uma barbearia
exports.updateBarbearia = async (req, res) => {
    const { id } = req.params;
    const { nome_barbearia, contacto_barbearia, imagem_logo_barbearia, localizacao_barbearia, descricao_localizacao,
        dias_funcionamento, horario_atendimento} = req.body;
    try {
        const barbearia = await Barbearia.findByPk(id);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada' });

        barbearia.name = nome_barbearia || barbearia.name;
        barbearia.contact = contacto_barbearia || barbearia.name;
        barbearia.location = localizacao_barbearia || barbearia.location;
        barbearia.imagem_barbearia = imagem_logo_barbearia || barbearia.imagem_barbearia;
        barbearia.descricao = descricao_localizacao || barbearia.descricao;
        barbearia.dias = dias_funcionamento || barbearia.dias;
        barbearia.atendimento = horario_atendimento || barbearia.atendimento;
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
