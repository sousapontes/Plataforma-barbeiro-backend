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
    name_barbeiro: DataTypes.STRING,
    Localizacao_Barbeario: DataTypes.STRING,
    contacto_Barbeiro: DataTypes.STRING,
    Descricao_Barbeiro: DataTypes.STRING,
    Data_Nascimento: DataTypes.DATE,
    contacto: DataTypes.STRING,
    Link_Rede_Socias: DataTypes.STRING,
    Especialidade: DataTypes.STRING,
    Experiencia: DataTypes.INTEGER,
    Status_Disponibilidade: DataTypes.BOOLEAN,
    Avaliacao_Barbeiro: DataTypes.FLOAT,
    Imagem_Logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barber',
  });
  return Barber;
};