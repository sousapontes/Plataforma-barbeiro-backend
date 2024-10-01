'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barbearia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_barbearia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contacto_barbearia: {
        type: Sequelize.STRING
      },
      imagem_logo_barbearia: {
        type: Sequelize.STRING
      },
      localizacao_barbearia: {
        type: Sequelize.STRING
      },
      descricao_localizacao: {
        type: Sequelize.STRING
      },
      dias_funcionamento: {
        type: Sequelize.TEXT
      },
      horario_atendimento: {
        type: Sequelize.TEXT
      },
      avaliacao: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Barbearia');
  }
};