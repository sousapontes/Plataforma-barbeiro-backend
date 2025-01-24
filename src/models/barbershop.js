'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barbearia extends Model {
    static associate(models) {
      // define association here
    }
  }
  Barbearia.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'Barbearia'
    }
  );
  return Barbearia;
};
