import User from '#models/user'
import Transaction from '#models/transaction'

export const payController = async (req, res) => {
  const { userUuid, transaction_name, transaction_amount } = req.body

  try {
    const user = await User.findOne({
      where: { uuid: userUuid }
    })
    const payment = new Transaction({
      userId: user.id,
      transaction_name,
      transaction_amount
    })
    await payment.save()
    res.json(payment)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
