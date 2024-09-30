'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    static associate(models) {
      Agendamento.belongsTo(models.Service, { foreignKey: 'servico_id', as: 'servico' });
      Agendamento.belongsTo(models.Barbearia, { foreignKey: 'barbearia_id', as: 'barbearia' });
      Agendamento.belongsTo(models.Barber, { foreignKey: 'barbeiro_id', as: 'barbeiro' });
      Agendamento.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    }
  }
  Agendamento.init({
    dia_realizacao_servico: DataTypes.DATEONLY,
    horario_servico: DataTypes.TIME,
    servico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    barbearia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    barbeiro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_agendamento: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendente',
    },
    data_agendamento: DataTypes.DATE,
    ultima_atualizacao: DataTypes.DATE,
    motivo_cancelamento: DataTypes.STRING,
    feedback_cliente: DataTypes.STRING,
    avaliacao_cliente: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avaliacao_barbeiro: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Agendamento',
  });
  return Agendamento;
};
