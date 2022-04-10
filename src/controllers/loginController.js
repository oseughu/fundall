import User from '#models/user'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  try {
    if (!user) {
      res.json({ message: 'Email or password does not match!' })
    } else if (user.password != password) {
      res.json({ message: 'Email or password does not match!' })
    } else {
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET
      )
      res.json({
        msg: 'Welcome to Fundall!!',
        token: jwtToken
      })
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
}
