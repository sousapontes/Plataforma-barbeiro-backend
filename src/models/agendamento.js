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
      Agendamento.belongsTo(models.Service, { foreignKey: 'fk_tipo_servico' });
      Agendamento.belongsTo(models.Barbearia, { foreignKey: 'fk_barbearia' });
      Agendamento.belongsTo(models.Barber, { foreignKey: 'fk_barbeiro' });
      Agendamento.belongsTo(models.Tabela_Clientes, { foreignKey: 'fk_cliente' });
        }
  }
  Agendamento.init({
    dia_realizacao_servico: DataTypes.DATEONLY,
    horario_servico: DataTypes.DATE,
    fk_tipo_servico: DataTypes.INTEGER,
    fk_barbearia: DataTypes.INTEGER,
    fk_barbeiro: DataTypes.INTEGER,
    fk_preco_servico: DataTypes.STRING,
    fk_cliente: DataTypes.INTEGER,
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