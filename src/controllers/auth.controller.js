const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função de login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Senha inválida' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};

// Função de registro
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Função de logout (opcional)
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout realizado com sucesso' });
};
