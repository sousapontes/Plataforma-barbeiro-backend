'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      Agendamento.belongsTo(models.Service, { foreignKey: 'servico_id', as: 'servico' });
      Agendamento.belongsTo(models.Barbearia, { foreignKey: 'barbearia_id', as: 'barbearia' });
      Agendamento.belongsTo(models.Barber, { foreignKey: 'barbeiro_id', as: 'barbeiro' });
      Agendamento.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    }
  }
  Agendamento.init({
    dia_realizacao_servico: DataTypes.DATEONLY,
    horario_servico: DataTypes.TIME,
    barbearia_id: DataTypes.INTEGER,
    barbeiro_id: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER,
    status_agendamento: DataTypes.STRING,
    data_agendamento: DataTypes.DATE,
    ultima_atualizacao: DataTypes.DATE,
    motivo_cancelamento: DataTypes.STRING,
    feedback_cliente: DataTypes.STRING,
    avaliacao_cliente: DataTypes.INTEGER,
    avaliacao_barbeiro: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agendamento',
  });
  return Agendamento;
};