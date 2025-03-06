const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// Função para centralizar as respostas de erro
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

// Middleware para autenticar o token
const autenticarToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return sendErrorResponse(res, 403, 'Token não fornecido');
    }

    if (!token.startsWith('Bearer ')) {
      return sendErrorResponse(res, 400, 'Formato de token inválido');
    }

    const tokenWithoutBearer = token.split(' ')[1];

    const decoded = jwt.verify(tokenWithoutBearer, secretKey);

    req.user = decoded; // Aqui armazenamos as informações do token no req.user
    next();
  } catch (error) {
    return sendErrorResponse(res, 401, 'Falha na autenticação!');
  }
};

// Função para gerar um novo token
const generateToken = (user) => {
  const payload = { sub: user.id, name: user.name, email: user.email, role:user.role }; // Use 'nome' se for o campo que armazena o nome do usuário
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Exportando as funções
module.exports = { autenticarToken, generateToken };
