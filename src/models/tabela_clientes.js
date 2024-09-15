'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tabela_Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tabela_Clientes.init({
    Name_Cliente: DataTypes.STRING,
    Contacto_Cliente: DataTypes.STRING,
    : DataTypes.DOUBLE,
    Ativo_Inativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tabela_Clientes',
  });
  return Tabela_Clientes;
};