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
      Barbearia.hasMany(models.Agendamento, { foreignKey: 'barbearia_id' });
    }
  }
  Barbearia.init({
    nome_barbearia: DataTypes.STRING,
    contacto_barbearia: DataTypes.STRING,
    imagem_logo_barbearia: DataTypes.STRING,
    localizacao_barbearia: DataTypes.STRING,
    descricao_localizacao: DataTypes.STRING,
    dias_funcionamento: DataTypes.TEXT,
    horario_atendimento: DataTypes.TEXT,
    avaliacao: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Barbearia',
  });
  return Barbearia;
};