'use strict'
import { Sequelize, DataTypes, Model } from 'sequelize'
import { sequelize } from '#config/db'

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate({ Transaction, Card }) {
    // define association here
    this.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' })
    this.hasMany(Card, { foreignKey: 'userId', as: 'cards' })
  }

  toJSON() {
    return {
      ...this.get(),
      id: undefined,
      password: undefined,
      balance: undefined
    }
  }
}
User.init(
  {
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter a name' },
        notEmpty: { msg: 'First Name cannot be blank' }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter your last name' },
        notEmpty: { msg: 'Last Name cannot be blank' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have an email' },
        notEmpty: { msg: 'Email cannot be empty' },
        isEmail: { msg: 'Please enter a valid email address' }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a phone number' },
        notEmpty: { msg: 'Phone number cannot be empty' },
        isNumeric: { msg: 'Please enter a valid phone number' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password' },
        notEmpty: { msg: 'Password cannot be empty' },
        min: 8
      }
    },
    balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User'
  }
)

export default User
