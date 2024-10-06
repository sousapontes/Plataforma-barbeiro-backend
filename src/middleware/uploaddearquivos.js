const multer = require('multer');

// Configurando onde salvar os arquivos e os nomes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Defina o diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Define o nome dos arquivos de forma única
  }
});

// Defina os tipos de arquivo permitidos (opcional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado'), false);
  }
};

// Inicializando o Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },  // Limite de 10MB
  fileFilter: fileFilter
});

module.exports = {upload};