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
      name_barbearia: {
        type: Sequelize.STRING
      },
      Localizacao_Barbearia: {
        type: Sequelize.STRING
      },
      contacto_Barbearia: {
        type: Sequelize.STRING
      },
      Descricao_Localizacao: {
        type: Sequelize.STRING
      },
      Dias_Funcionamento: {
        type: Sequelize.STRING
      },
      Horario_Atendimento: {
        type: Sequelize.STRING
      },
      Metodos_Pagamento: {
        type: Sequelize.STRING
      },
      Descricao_Barbearia: {
        type: Sequelize.TEXT
      },
      Avaliacao_Barbearia: {
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
    await queryInterface.dropTable('Barbearia');
  }
};