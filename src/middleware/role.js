// Middleware de autorização
function authorize(role) {
    return (req, res, next) => {
        const userRole = req.user.role; // Certifique-se de que req.user.role é onde está o papel do usuário

        if (userRole !== role) {
            return res.status(403).json({ message: "Acesso negado. Você não tem permissão." });
        }
        next();
    };
}

module.exports = { authorize };

