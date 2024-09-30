'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate(models) {
      // associações futuras
    }
  }
  Login.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Login',
    timestamps: true
  });
  return Login;
};



