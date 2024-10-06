const Cliente = require('../models/cliente');
const User = require('../models/user');

// Lista todos os clientes cadastrados
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar clientes', error });
    }
};

// Obtém detalhes de um cliente específico
exports.getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter cliente', error });
    }
};

// Cadastra um novo cliente
exports.createCliente = async (req, res) => {
    const { nome, contato, email, dataNascimento } = req.body;
    try {
        const newCliente = await Cliente.create({ nome, contato, email, dataNascimento });
        return res.status(201).json(newCliente);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
    }
};

// Atualiza informações de um cliente
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, contato, email, dataNascimento } = req.body;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

        cliente.nome = nome || cliente.nome;
        cliente.contato = contato || cliente.contato;
        cliente.email = email || cliente.email;
        cliente.dataNascimento = dataNascimento || cliente.dataNascimento;
        await cliente.save();
        
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar cliente', error });
    }
};

// Remove um cliente
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

        await cliente.destroy();
        return res.status(200).json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover cliente', error });
    }
};

// Função para atualizar a foto de perfil
exports.updateFotoPerfil = async (req, res) => {
    const { id } = req.params; // ID do cliente que deseja atualizar
    const cliente = await Cliente.findByPk(id);
    const existingUser = await User.findOne({ where: { id } });

    if (!cliente || !existingUser) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
  
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma foto enviada.' });
    }
  
    try {
      // Atualiza a URL da foto de perfil no banco de dados
      cliente.foto_perfil = req.file.path; // Salva o caminho da imagem
      await cliente.save();
  
      return res.status(200).json({
        message: 'Foto de perfil atualizada com sucesso.',
        cliente,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar foto de perfil.' });
    }
  };