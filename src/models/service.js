'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.hasMany(models.Agendamento, { foreignKey: 'servico_id' });
    }
  }
  Service.init({
    tipo_servico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracao_servico: DataTypes.INTEGER,
    preco_servico: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ativo_inativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
