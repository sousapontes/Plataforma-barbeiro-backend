const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.sub; // use 'sub' se for assim que você codifica o ID do usuário
    next();
  });
};

const generateToken = (user) => {
  const payload = { sub: user.id, name: user.name };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

module.exports = { verifyToken, generateToken };