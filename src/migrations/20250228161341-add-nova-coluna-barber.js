'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Barbers', 'day', {
      type: Sequelize.ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'),
      allowNull: true,         // Permite valores nulos
      defaultValue: null,      // Valor padrão
    });
    await queryInterface.addColumn('Barbers', 'startTime', {
      type: Sequelize.STRING, // Tipo da coluna (pode ser STRING, INTEGER, BOOLEAN, etc.)
      allowNull: true,         // Permite valores nulos (opcional)
      defaultValue: null,      // Valor padrão (opcional)
    });
    await queryInterface.addColumn('Barbers', 'endTime', {
      type: Sequelize.STRING, // Tipo da coluna (pode ser STRING, INTEGER, BOOLEAN, etc.)
      allowNull: true,         // Permite valores nulos (opcional)
      defaultValue: null,      // Valor padrão (opcional)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('TabelaExistente', 'day');
    await queryInterface.removeColumn('TabelaExistente', 'startTime');
    await queryInterface.removeColumn('TabelaExistente', 'endTime');
  }
};
