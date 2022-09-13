'use strict'
import sequelize from '#utils/db'
import { DataTypes, Model } from 'sequelize'

export default class Transaction extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate({ User }) {
    // define association here
    this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  }

  toJSON() {
    return {
      ...this.get(),
      id: undefined,
      userId: undefined
    }
  }
}

Transaction.init(
  {
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    transaction_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter a name for this transaction' },
        notEmpty: { msg: 'Transaction Name cannot be blank' }
      }
    },
    transaction_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter an amount for this transaction' },
        notEmpty: { msg: 'Amount cannot be blank' },
        isDecimal: { msg: 'Please enter a valid amount' }
      }
    }
  },
  {
    sequelize,
    tableName: 'transactions',
    modelName: 'Transaction'
  }
)
