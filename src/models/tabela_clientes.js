'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Agendamento, { foreignKey: 'cliente_id' });
    }
  }
  Cliente.init({
    name_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contacto_cliente: DataTypes.STRING,
    morada_cliente: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    preferencia_cliente: DataTypes.STRING,
    avaliacao: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
