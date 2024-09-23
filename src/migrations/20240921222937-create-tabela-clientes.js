'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tabela_Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name_Cliente: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Contacto_Cliente: {
        type: Sequelize.STRING
      },
      Morada_Cliente: {
        type: Sequelize.STRING
      },
      Data_Nascimento: {
        type: Sequelize.DATE
      },
      Preferencia_Cliente: {
        type: Sequelize.STRING
      },
      Avaliacao: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Tabela_Clientes');
  }
};