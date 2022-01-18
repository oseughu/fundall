'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      card_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      card_cost: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('cards');
  }
};