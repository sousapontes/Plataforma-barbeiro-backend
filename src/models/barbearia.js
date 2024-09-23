'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barbearia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barbearia.init({
    name_barbearia: DataTypes.STRING,
    Localizacao_Barbearia: DataTypes.STRING,
    contacto_Barbearia: DataTypes.STRING,
    Descricao_Localizacao: DataTypes.STRING,
    Dias_Funcionamento: DataTypes.STRING,
    Horario_Atendimento: DataTypes.STRING,
    Metodos_Pagamento: DataTypes.STRING,
    Descricao_Barbearia: DataTypes.TEXT,
    Avaliacao_Barbearia: DataTypes.FLOAT,
    Imagem_Logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barbearia',
    timestamps:true
  });
  return Barbearia;
};