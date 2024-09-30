'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      horarios_atendimento: {
        type: Sequelize.TEXT
      },
      avaliacao: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Barbearia');
  }
};
