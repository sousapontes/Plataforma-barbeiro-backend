const express = require('express');
const router = express.Router();
const { autenticarToken } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const baixar = require("../middleware/UploadFile");
const multer = require('multer');

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo com timestamp
    },
});

// Configuração do middleware Multer
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Validação de tipos de arquivo, exemplo: apenas imagens
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas arquivos de imagem são permitidos.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB por arquivo
});

// Middleware para upload de um único arquivo
baixar.singleUploadMiddleware = upload.single('profile');

// Middleware genérico para upload de múltiplos arquivos (opcional)
baixar.multipleUploadMiddleware = upload.array('fotos', 5); // Até 5 arquivos com o campo 'fotos'

// Controlador para upload de arquivos
baixar.uploadController = (req, res) => {
    // Resposta padrão com informações do arquivo ou arquivos enviados
    res.json({
        message: 'Upload realizado com sucesso!',
        file: req.file || null, // Arquivo único (se existir)
        files: req.files || null, // Múltiplos arquivos (se existir)
    });
};

// Rota para upload de um único arquivo
router.post('/upload/single', autenticarToken, authorize('admin', 'user'), baixar.singleUploadMiddleware, baixar.uploadController);

// Rota para upload de múltiplos arquivos
router.post('/upload/multiple', autenticarToken, authorize('admin', 'user'), baixar.multipleUploadMiddleware, baixar.uploadController);

// Tratamento de erros de Multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Erros específicos do Multer
        return res.status(400).json({ message: 'Erro no upload.', error: err.message });
    } else if (err) {
        // Outros erros
        return res.status(500).json({ message: 'Erro interno.', error: err.message });
    }
    next();
});

module.exports = router;
