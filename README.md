# Plataforma-barbeiro-backend
A plataforma deve ter funcionalidades principais para gestão de uma barbeiro, a parte de bckend.

## Barbearia tem muitos Barbeiros:
Barbearia.hasMany(Barbeiro, { foreignKey: 'barbeariaId' });
Barbeiro.belongsTo(Barbearia, { foreignKey: 'barbeariaId' });

## Barbearia tem muitos Serviços:
Barbearia.hasMany(Servico, { foreignKey: 'barbeariaId' });
Servico.belongsTo(Barbearia, { foreignKey: 'barbeariaId' });

## Barbeiro pode realizar muitos Agendamentos:
Barbeiro.hasMany(Agendamento, { foreignKey: 'barbeiroId' });
Agendamento.belongsTo(Barbeiro, { foreignKey: 'barbeiroId' });


## Cliente pode fazer muitos Agendamentos:
Cliente.hasMany(Agendamento, { foreignKey: 'clienteId' });
Agendamento.belongsTo(Cliente, { foreignKey: 'clienteId' });

## Serviço é parte de um Agendamento:
Servico.hasMany(Agendamento, { foreignKey: 'servicoId' });
Agendamento.belongsTo(Servico, { foreignKey: 'servicoId' });

## 1. Inicialização do ``Projeto``

## 2. Configurações Iniciais

## 3. Adicionar e Instalar os ``Framworks``

## 4. Conexão com Base de Dados

## 5. Criação/Configuração das Models

## 6. Configurações das ``Migrations``

## 7. Construção/Implementação das ``Rotas``

## 8. Implementação das ``Lógicas da Plataforma``

## 9. Teste Das ``Rotas e Logica da Plataforma`` com ``Ìnsomnia``

## 10. Implemetação do ``docker``

## 11. Estrutura do Projeto ``Backend``

/projeto-barbeiro-backend
│
├── /node_modules
├── /src
│   ├── /config
│   │   └── config.js
│   │
│   ├── /controllers
│   │   ├── agendamento.controller.js
│   │   ├── auth.controller.js
│   │   ├── avaliacao.controller.js
│   │   ├── barbearia.controller.js
│   │   ├── barbeiro.controller.js
│   │   ├── cliente.controller.js
│   │   └── servico.controller.js
│   │
│   ├── /middlewares
│   │   └── auth.js
│   │
│   ├── /migrations
│   │   ├── 20241002212247-create-agendamento.js
│   │   ├── 20241002212300-create-barbearia.js
│   │   ├── 20241002212323-create-barber.js
│   │   ├── 20241002212349-create-cliente.js
│   │   ├── 20241002212411-create-login.js
│   │   ├── 20241002212427-create-avaliacao.js
│   │   ├── 20241002212859-create-service.js
│   │   └── 20241002230146-create-user.js
│   │
│   ├── /models
│   │   ├── agendamento.js
│   │   ├── avaliacao.js
│   │   ├── barbearia.js
│   │   ├── barber.js
│   │   ├── cliente.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── service.js
│   │   └── user.js
│   │
│   ├── /routes
│   │   ├── routes_agendamento.js
│   │   ├── routes_autenticacao.js
│   │   ├── routes_avaliacoes.js
│   │   ├── routes_barbearia.js
│   │   ├── routes_barbeiros.js
│   │   ├── routes_clientes.js
│   │   └── routes_servico.js
│   │
│   ├── app.js
│   └── server.js  // Arquivo para configurar o servidor e conectar à base de dados
│
├── .env
├── .gitignore
├── .sequelizerc
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
