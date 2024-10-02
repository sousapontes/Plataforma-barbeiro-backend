const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// Função para centralizar as respostas de erro
const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

// Middleware para autenticar o token
const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Verificação se o token foi fornecido
  if (!token) {
    return sendErrorResponse(res, 403, 'Token não fornecido');
  }

  // Verificação do formato do token
  if (!token.startsWith('Bearer ')) {
    return sendErrorResponse(res, 400, 'Formato de token inválido');
  }

  // Removendo o prefixo 'Bearer ' para obter o token puro
  const tokenWithoutBearer = token.split(' ')[1];

  // Verificação e decodificação do token
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
    if (err) {
      return sendErrorResponse(res, 401, 'Token inválido');
    }
    req.userId = decoded.sub; // Use 'sub' se for assim que você codifica o ID do usuário
    next();
  });
};

// Função para gerar um novo token
const generateToken = (user) => {
  const payload = { sub: user.id, name: user.nome }; // Use 'nome' se for o campo que armazena o nome do usuário
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Exportando as funções
module.exports = { autenticarToken, generateToken };
