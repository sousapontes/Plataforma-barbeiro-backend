'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Appointment, {
        foreignKey: 'barberId',
        as: 'appointments'
      });
    }
  }
  Barber.init({
    name: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    specialty: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Barber',
  });
  return Barber;
};
