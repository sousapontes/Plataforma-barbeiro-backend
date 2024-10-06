'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adicione a nova coluna na tabela desejada
    await queryInterface.addColumn('Clientes', 'foto_perfil', {
      type: Sequelize.STRING, // Altere o tipo de dado conforme necessário
      allowNull: true, // Altere para false se a coluna for obrigatória
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove a nova coluna caso você queira reverter a migration
    await queryInterface.removeColumn('Clientes', 'foto_perfil');
  }
};
