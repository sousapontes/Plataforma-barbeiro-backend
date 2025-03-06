'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Barbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      day: {
      type: Sequelize.ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'),
      allowNull: false,
      defaultValue: null
      },
      startTime:{
      type: Sequelize.STRING, // Tipo da coluna (pode ser STRING, INTEGER, BOOLEAN, etc.)
      allowNull: true,         // Permite valores nulos (opcional)
      defaultValue: null,      // Valor padrão (opcional)
      },
      endTime:{
        type: Sequelize.STRING, // Tipo da coluna (pode ser STRING, INTEGER, BOOLEAN, etc.)
        allowNull: true,         // Permite valores nulos (opcional)
        defaultValue: null,      // Valor padrão (opcional)
      },
      barberShopId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BarberShops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    queryInterface.addColumn('Barbers', 'day', { type: DataTypes.STRING });
    queryInterface.addColumn('Barbers', 'startTime', { type: DataTypes.STRING });
    queryInterface.addColumn('Barbers', 'endTime', { type: DataTypes.STRING });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Barbers');
  }
};
