'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dia_realizacao_servico: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      horario_servico: {
        type: Sequelize.TIME,
        allowNull: false
      },
      barbearia_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      barbeiro_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status_agendamento: {
        type: Sequelize.STRING
      },
      data_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ultima_atualizacao: {
        type: Sequelize.DATE
      },
      motivo_cancelamento: {
        type: Sequelize.STRING
      },
      feedback_cliente: {
        type: Sequelize.STRING
      },
      avaliacao_cliente: {
        type: Sequelize.INTEGER
      },
      avaliacao_barbeiro: {
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
    await queryInterface.dropTable('Agendamentos');
  }
};