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

