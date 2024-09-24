'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barber.init({
    nome_barbeiro: DataTypes.STRING,
    localizacao_barbeiro: DataTypes.STRING,
    contacto_barbeiro: DataTypes.STRING,
    descricao_barbeiro: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    Link_Rede_Socias: DataTypes.STRING,
    especialidade: DataTypes.STRING,
    experiencia: DataTypes.INTEGER,
    status_disponibilidade: DataTypes.BOOLEAN,
    avaliacao_barbeiro: DataTypes.FLOAT,
    Imagem_Logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barber',
  });
  return Barber;
};