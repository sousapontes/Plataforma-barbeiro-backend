'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.hasMany(models.Agendamento, { foreignKey: 'servico_id' });
    }
  }
  Service.init({
    tipo_servico: DataTypes.STRING,
    duracao_servico: DataTypes.INTEGER,
    preco_servico: DataTypes.DOUBLE,
    ativo_inativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};