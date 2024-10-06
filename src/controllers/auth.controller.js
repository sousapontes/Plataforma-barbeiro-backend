const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Ou caminho correto para a pasta de modelos


// Função para centralizar respostas de erro
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
  };

// Função de login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await User.findOne({ where: { email } });
        if (!users) return res.status(404).json({ message: 'Usuário não encontrado' });

        const validPassword = await bcrypt.compare(password, users.password);
        if (!validPassword) return res.status(401).json({ message: 'Senha inválida' });

        const token = jwt.sign({ id: users.id, role: users.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};

// Função de registro
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password) {
      return sendErrorResponse(res, 400, 'Preencha todos os campos.');
    }
  
    try {
      // Verifica se o email já está cadastrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return sendErrorResponse(res, 400, 'Email já cadastrado.');
      }
  
      // Cria o hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Cria o novo usuário no banco de dados
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      // Resposta de sucesso
      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        }
      });
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Erro ao registrar usuário.');
    }
  };

  exports.logout = (req, res) => {
    // Se estiver usando cookies, remover o JWT cookie (opcional)
    res.clearCookie('token');  // Se você estiver usando cookies para armazenar o token

    // Se quiser implementar a blacklist de tokens, pode adicionar o token atual à lista de tokens inválidos
    // blacklist.add(req.token);

    return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

