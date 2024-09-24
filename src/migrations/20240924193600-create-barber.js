'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_barbeiro: {
        type: Sequelize.STRING
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
        type: Sequelize.BOOLEAN
      },
      avaliacao_barbeiro: {
        type: Sequelize.FLOAT
      },
      Imagem_Logo: {
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
    await queryInterface.dropTable('Barbers');
  }
};