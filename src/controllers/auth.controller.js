import User from '#models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        password: await bcrypt.hash(password, 10)
      })
      await user.save()
      res.json(user)
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  try {
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' })
    }

    await bcrypt.compare(password, user.password)

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET
    )
    res.json({
      msg: 'Welcome to Fundall!!',
      token: jwtToken
    })
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
