// src/middleware/checkRole.js

const checkRole = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;  // Supondo que o papel do usuário esteja no req.user após a autenticação
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente.' });
      }
  
      next();
    };
  };
  
  module.exports = checkRole;
  