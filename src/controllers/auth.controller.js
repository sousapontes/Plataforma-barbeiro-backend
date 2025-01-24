const bcrypt = require('bcrypt');
const jwt = require('../middleware/auth');
const {User} = require('../models');


// Função de login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Credencias Inválidas' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciais inválida' });
        }

        // Gera o token com role e outros dados do usuário
        const token = jwt.generateToken(user);
       

        // Define o cookie com o token
        res.cookie('token', token, {
            httpOnly: true, // O cookie não pode ser acessado via JavaScript
            secure: process.env.NODE_ENV === 'development', // Apenas HTTPS em produção
            sameSite: 'strict', // Protege contra CSRF
            maxAge: 24 * 60 * 60 * 1000, // Expira em 24 horas
        });

        // Retorna mensagem de sucesso
        return res.status(200).json({ token, message: 'Login realizado com sucesso' });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao autenticar o utilizador', error: error.message });
    }
};


// Função de registro
exports.register = async (req, res) => {
    
    try {
        const { name, email, password,confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Preencha todos os campos!' });
        }

        if (password != confirmPassword) {
                return res.status(400).json({ message: 'As senhas não coferem.' });
        }

        const usuario = await User.findOne({ where: { email: email } });
        if (usuario) {
                return res.status(409).json({ message: 'Email já cadastrado!' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = await User.count() === 0 ? 'admin' : 'user'; // Admin no primeiro registro

        const newUser = await User.create({ 
             name,
             email, 
             password: hashedPassword, 
             role 
            });
;        return res.status(201).json({ message: 'Utilizador registrado com sucesso', user: newUser });
    } catch (error) {
        console.log(error);  // Para inspecionar o erro
        return res.status(500).json({ message: 'Erro ao cadastrar utilizador', error: error.message });
    }
    
};


//listar todos os utilizadores
exports.getUtilizadores = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar utilizadores'});
    }
};

// Obtém um utilizador específico
exports.getUtilizadoresById = async (req, res) => {
    try {

        const { id } = req.params;
    
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter utilizador' });
    }
};


// Atualiza um utilizador
exports.updateUtilizadores = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado!' });

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro ao atualizar utilizador, por favor tente novamente mais tarde!' });
    }
};

// Deleta um utilizador
exports.deleteUtilizadores = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });

        await user.destroy();
        return res.status(200).json({ message: 'Utilizador deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar utilizador, por favor tente novamente mais tarde!' });
    }
};

//LandPage
exports.landingPage = (req, res) => {
    res.json( { title: 'Home' });
}

// Função de logout (opcional)
exports.logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true, // Garante que o cookie não seja acessado pelo JavaScript do cliente
            secure: process.env.NODE_ENV !== 'development', // HTTPS apenas em produção
            sameSite: 'strict', // Protege contra ataques CSRF
        });
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
        res.status(500).json({ message: 'Erro ao realizar logout', error: error.message });
    }
};
