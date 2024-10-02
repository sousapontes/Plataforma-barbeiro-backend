'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avaliacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Avaliacao.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
      Avaliacao.belongsTo(models.Barbearia, { foreignKey: 'barbearia_id', as: 'barbearia' });
      Avaliacao.belongsTo(models.Barber, { foreignKey: 'barbeiro_id', as: 'barbeiro' });
      Avaliacao.belongsTo(models.Service, { foreignKey: 'servico_id', as: 'servico' });
    }
  }
  Avaliacao.init({
    nota: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    cliente_id: DataTypes.INTEGER,
    barbearia_id: DataTypes.INTEGER,
    barbeiro_id: DataTypes.INTEGER,
    servico_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Avaliacao',
  });
  return Avaliacao;
};