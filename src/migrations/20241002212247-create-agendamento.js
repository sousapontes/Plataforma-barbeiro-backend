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
        type: Sequelize.DATEONLY
      },
      horario_servico: {
        type: Sequelize.TIME
      },
      barbearia_id: {
        type: Sequelize.INTEGER
      },
      barbeiro_id: {
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.INTEGER
      },
      status_agendamento: {
        type: Sequelize.STRING
      },
      data_agendamento: {
        type: Sequelize.DATE
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