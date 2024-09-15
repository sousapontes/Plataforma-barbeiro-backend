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
      name_barbeiro: {
        type: Sequelize.STRING
      },
      Localizacao_Barbeario: {
        type: Sequelize.STRING
      },
      contacto_Barbeiro: {
        type: Sequelize.STRING
      },
      Descricao_Barbeiro: {
        type: Sequelize.STRING
      },
      Data_Nascimento: {
        type: Sequelize.DATE
      },
      contacto: {
        type: Sequelize.STRING
      },
      Link_Rede_Socias: {
        type: Sequelize.STRING
      },
      Especialidade: {
        type: Sequelize.STRING
      },
      Experiencia: {
        type: Sequelize.INTEGER
      },
      Status_Disponibilidade: {
        type: Sequelize.BOOLEAN
      },
      Avaliacao_Barbeiro: {
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