'use strict'
import { Model } from 'sequelize'

export const Card = (sequelize, DataTypes) => {
  class Card extends Model {
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
  Card.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      card_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Please enter a card name' },
          notEmpty: { msg: 'Card type cannot be blank' }
        }
      },
      card_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'How much does this card cost?' },
          notEmpty: { msg: 'Card cost cannot be blank' }
        }
      }
    },
    {
      sequelize,
      tableName: 'cards',
      modelName: 'Card'
    }
  )
  return Card
}
