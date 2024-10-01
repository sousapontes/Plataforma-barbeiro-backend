'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_cliente: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      contacto_cliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      morada: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
      },
      preferencia: {
        type: Sequelize.STRING
      },
      avaliacao: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};