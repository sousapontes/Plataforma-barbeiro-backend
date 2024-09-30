'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    static associate(models) {
      Barber.hasMany(models.Agendamento, { foreignKey: 'barbeiro_id' });
    }
  }
  Barber.init({
    nome_barbeiro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localizacao_barbeiro: DataTypes.STRING,
    contacto_barbeiro: DataTypes.STRING,
    descricao_barbeiro: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    link_rede_sociais: DataTypes.STRING,
    especialidade: DataTypes.STRING,
    experiencia: DataTypes.INTEGER,
    status_disponibilidade: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    avaliacao_barbeiro: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    imagem_logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barber',
  });
  return Barber;
};
