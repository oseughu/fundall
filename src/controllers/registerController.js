import User from '#models/user'

export const register = async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body

  const alreadyExists = await User.findOne({ where: { email } })

  try {
    if (alreadyExists) {
      res.json({ error: 'User already exists. Try to log in' })
    } else {
      const user = new User({
        first_name,
        last_name,
        phone,
        email,
        password
      })
      await user.save()
      res.json(user)
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
