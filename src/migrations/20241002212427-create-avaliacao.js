'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Avaliacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nota: {
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.TEXT
      },
      cliente_id: {
        type: Sequelize.INTEGER
      },
      barbearia_id: {
        type: Sequelize.INTEGER
      },
      barbeiro_id: {
        type: Sequelize.INTEGER
      },
      servico_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Avaliacaos');
  }
};