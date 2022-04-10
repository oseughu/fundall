import { User } from '#models/user'
import { Card } from '#models/card'
import { Transaction } from '#models/transaction'

export const getUser = async (req, res) => {
  const { uuid } = req.params

  try {
    const user = await User.findOne({
      where: { uuid },
      include: ['transactions', 'cards']
    })

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const getUserCards = async (req, res) => {
  const { uuid } = req.params

  try {
    const user = await User.findOne({
      where: { uuid }
    })
    const cards = await Card.findAll({
      where: { userId: user.id }
    })
    res.json(cards)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const getUserTransactions = async (req, res) => {
  const { uuid } = req.params

  try {
    const user = await User.findOne({
      where: { uuid }
    })
    const transactions = await Transaction.findAll({
      where: { userId: user.id }
    })
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
