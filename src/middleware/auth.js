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

    //verifica se o token começa com a string "Bearer ".
  if (!token.startsWith('Bearer ')) {
    return sendErrorResponse(res, 400, 'Formato de token inválido');
  }
  
  //Se o token estiver no formato correto, o código extrai a parte do token que não inclui a string "Bearer "
  const tokenWithoutBearer = token.split(' ')[1];
  
  // Verificação se o token é válido
  jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {

    console.log(tokenWithoutBearer);
    console.log(secretKey);

    if (err) {
      return sendErrorResponse(res, 401, 'Token inválido');
    }
    req.userId = decoded.sub;
    next();
  });
  
};


// Função para gerar um novo token
const generateToken = (user) => {
  const payload = { sub: user.id, role: user.role }; // Use 'nome' se for o campo que armazena o nome do usuário
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};


const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;  // Supondo que o papel do usuário esteja no req.user após a autenticação

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente.' });
    }

    next();
  };
};



// Exportando as funções
module.exports = { autenticarToken, generateToken, checkRole };
