const {Service} = require('../models');
const {Barbearia} = require('../models');

// Lista todos os serviços padrão
exports.getServicos = async (req, res) => {
    try {
        const servicos = await Service.findAll();
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar Dados', error });
    }
};

// Obtém uma serviço específico padrão
exports.getServicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const servicos = await Service.findByPk(id);
        if (!servicos) return res.status(404).json({ message: 'Dados não encontrado' });
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter dados', error });
    }
};

// Cria um novo serviço padrão
exports.createServico = async (req, res) => {
    try {
    const {  name, decription, price, duration, categoria, barberShopId, } = req.body;

    // Validações
    if ( !barberShopId || !name || !categoria || !decription || !price || !duration) {
        return res.status(400).json({ message: 'Preencha os campos obrigatórios.' });
    }
        const newServico = await Service.create({ name, categoria, decription, price, duration });
        return res.status(200).json({
            message: "Dados criados com sucesso",
            data: newServico,
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro ao criar serviço', error });
    }
};

// Atualiza um serviço || Editar um serviço padrão
exports.updateServico = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do serviço a ser atualizado
        const { name, categoria, decription, price, duration } = req.body; // Obtém os campos do corpo da requisição

        // Atualiza o serviço diretamente no banco de dados
        const [servicoAtualizado] = await Service.update(
            { name, categoria, decription, price, duration }, // Campos a serem atualizados
            { where: { id }, returning: true }   // Condição para localizar o serviço e retorna o atualizado
        );

        // Verifica se o serviço foi encontrado e atualizado
        if (!servicoAtualizado) {
            return res.status(404).json({ message: 'Serviço não encontrado.' });
        }

        // Retorna o serviço atualizado (caso seja necessário) ou uma mensagem de sucesso
        const servico = await Service.findByPk(id); // Busca o serviço atualizado para retornar o objeto completo
        return res.status(200).json({
            message: 'Serviço atualizado com sucesso.',
            servico,
        });
    } catch (error) {
        // Trata erros gerais e retorna um erro interno do servidor
        return res.status(500).json({
            message: 'Erro ao atualizar dados.',
            error: error.message,
        });
    }
};

// Deleta um serviço padrão
exports.deleteServico = async (req, res) => {
    try {
    const { id } = req.params;

        const servico = await Service.findByPk(id);
        if (!servico) return res.status(404).json({ message: 'Serviço não encontrado' });

        await servico.destroy();
        return res.status(200).json({ message: 'Dados deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar dados, tente novamente mais tarde', error });
    }
};

// Configurar serviços específicos para uma barbearia
//router.post('/barbearias/:barberShopId/servicos' 
exports.ServicoEspecificoBarbearia = async (req, res) => {
    try {
        const { barberShopId } = req.params;
        const { name, preco, duracao, categoria } = req.body;
        const barbearia = await Barbearia.findByPk(barberShopId);
        if (!barbearia) return res.status(404).json({ message: 'Barbearia não encontrada.' });

        const servicoPersonalizado = await Service.create({ name, preco, duracao, categoria, BarberShopId: barberShopId });
        res.status(201).json(servicoPersonalizado);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao configurar dados para barbearia.', error: err.message });
    }
};

// Listar serviços de uma barbearia específica
exports.ListarServicoBarbeariaEspecifica = async (req, res) => {
    try {
        const { barberShopId } = req.params;
        const servicos = await Service.findAll({ where: { Barbearia_Id: barberShopId } });
        if (!servicos.length) return res.status(404).json({ message: 'Nenhum serviço encontrado para esta barbearia.' });
        res.status(200).json(servicos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar serviços da barbearia.', error: err.message });
    }
};
