'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_servico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      duracao_servico: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preco_servico: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      ativo_inativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Services');
  }
};