import User from '#models/user'
import Card from '#models/card'

export const getCard = async (req, res) => {
  const { uuid, card_type, card_cost } = req.body

  try {
    const user = await User.findOne({
      where: { uuid }
    })
    const card = new Card({
      userId: user.id,
      card_type,
      card_cost
    })
    await card.save()
    res.json(card)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
