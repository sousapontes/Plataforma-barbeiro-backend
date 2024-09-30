'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barbearia extends Model {
    static associate(models) {
      Barbearia.hasMany(models.Agendamento, { foreignKey: 'barbearia_id' });
    }
  }
  Barbearia.init({
    nome_barbearia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacto_barbearia: DataTypes.STRING,
    imagem_logo_barbearia: DataTypes.STRING,
    localizacao_barbearia: DataTypes.STRING,
    descricao_localizacao: DataTypes.STRING,
    dias_funcionamento: DataTypes.TEXT,
    horarios_atendimento: DataTypes.TEXT,
    avaliacao: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Barbearia',
  });
  return Barbearia;
};
