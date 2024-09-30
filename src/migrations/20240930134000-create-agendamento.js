'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
        type: Sequelize.DATE,
        allowNull: false
      },
      tipo_Servico: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome_barbearia: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nome_barbeiro: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fk_preco_servico: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Name_Cliente: {
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Agendamentos');
  }
};

