'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Barbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_barbeiro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      localizacao_barbeiro: {
        type: Sequelize.STRING
      },
      contacto_barbeiro: {
        type: Sequelize.STRING
      },
      descricao_barbeiro: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
      },
      Link_Rede_Socias: {
        type: Sequelize.STRING
      },
      especialidade: {
        type: Sequelize.STRING
      },
      experiencia: {
        type: Sequelize.INTEGER
      },
      status_disponibilidade: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      avaliacao_barbeiro: {
        type: Sequelize.FLOAT
      },
      Imagem_Logo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Barbers');
  }
};
