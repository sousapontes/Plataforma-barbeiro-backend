'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cliente.hasMany(models.Agendamento, { foreignKey: 'cliente_id' });
    }
  }
  Cliente.init({
    name_cliente: DataTypes.STRING,
    email: DataTypes.STRING,
    contacto_cliente: DataTypes.STRING,
    morada: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    preferencia: DataTypes.STRING,
    avaliacao: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};