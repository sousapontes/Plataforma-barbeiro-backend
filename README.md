# Plataforma-barbeiro-backend
A plataforma deve ter funcionalidades principais para gestão de uma barbeiro, a parte de bckend.


const Barbearia = sequelize.define('Barbearia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_barbearia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto_barbearia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem_logo_barbearia: {
    type: DataTypes.STRING, // URL para a logo
    allowNull: true
  },
  localizacao_barbearia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  complemento_localizacao_barbearia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dias_funcionamento: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Exemplo: ['Segunda', 'Terça']
    allowNull: false
  },
  horarios_atendimento: {
    type: DataTypes.JSON, // Exemplo: { "Segunda": "09:00-18:00", "Terça": "09:00-18:00" }
    allowNull: false
  },
  metodos_pagamento: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Exemplo: ['Cartão', 'Dinheiro']
    allowNull: true
  },
  avaliacao_barbearia: {
    type: DataTypes.FLOAT, // Exemplo de média de avaliações
    allowNull: true
  }
}, {
  timestamps: false
});


const Barbeiro = sequelize.define('Barbeiro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_barbeiro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link_redes_sociais: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Exemplo: ['instagram_url', 'facebook_url']
    allowNull: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experiencia: {
    type: DataTypes.INTEGER, // Anos de experiência
    allowNull: false
  },
  status_disponibilidade: {
    type: DataTypes.BOOLEAN, // true para disponível, false para ocupado
    allowNull: false
  },
  avaliacao_barbeiro: {
    type: DataTypes.FLOAT, // Média de avaliações
    allowNull: true
  }
}, {
  timestamps: false
});


const Servico = sequelize.define('Servico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_servico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ativo_inativo: {
    type: DataTypes.BOOLEAN, // true para ativo, false para inativo
    allowNull: false
  },
  inicio_servico: {
    type: DataTypes.TIME,
    allowNull: false
  },
  fim_servico: {
    type: DataTypes.TIME,
    allowNull: false
  },
  preco_servico: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  duracao_servico: {
    type: DataTypes.INTEGER, // Duração em minutos
    allowNull: false
  }
}, {
  timestamps: false
});


const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia_realizacao_servico: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  horario_servico: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status_agendamento: {
    type: DataTypes.STRING, // Exemplo: 'confirmado', 'cancelado', 'realizado'
    allowNull: false
  }
}, {
  timestamps: false
});


const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whatsapp_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_nascimento_cliente: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  avaliacao_cliente: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  timestamps: false
});

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

