'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      transaction_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      transaction_amount: {
        type: DataTypes.DECIMAL,
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
    await queryInterface.dropTable('transactions')
  }
}
