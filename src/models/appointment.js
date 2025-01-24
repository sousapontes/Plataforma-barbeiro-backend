'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

       // Relacionamento com User (Cliente)
       this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      // Relacionamento com Barber (Barbeiro)
      this.belongsTo(models.Barber, {
        foreignKey: 'barberId',
        as: 'barber'
      });

      // Relacionamento com Service (Serviço)
      this.belongsTo(models.Service, {
        foreignKey: 'serviceId',
        as: 'service'
      }

      );
    }
  }
  Appointment.init({
    titulo: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    status: DataTypes.ENUM('cancelar', 'pendente', 'concluido'),
    userId: DataTypes.INTEGER,
    barberId: DataTypes.INTEGER,
    serviceId:DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};