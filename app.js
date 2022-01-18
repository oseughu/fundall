//Require all the necessary modules
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const port = process.env.PORT || 3000
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { sequelize, User, Transaction, Card } = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Use express-session to save cookies and user data
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// //Create passport strategy for user authentication
// passport.use(User.createStrategy())

// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   User.findOne(id, (err, user) => {
//     done(err, user)
//   })
// })

// passport.use(
//   new LocalStrategy((email, password, done) => {
//     User.findOne({ username: email }, (err, user) => {
//       if (err) {
//         return done(err)
//       }
//       if (!user) {
//         return done(null, false)
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false)
//       }
//       return done(null, user)
//     })
//   })
// )

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  try {
    if (!user) {
      return res.json({ message: 'Email or password does not match!' })
    } else if (user.password != password) {
      return res.json({ message: 'Email or password does not match!' })
    } else {
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET
      )
      return res.json({ msg: 'Welcome to fundall!', token: jwtToken })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/signup', async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body

  const alreadyExists = await User.findOne({ where: { email } })

  try {
    if (alreadyExists) {
      return res.json({ error: 'User already exists. Try to log in' })
    } else {
      const newUser = new User({
        first_name,
        last_name,
        phone,
        email,
        password
      })
      await newUser.save()
      return res.json(newUser)
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
})

app.get('/user/:uuid', async (req, res) => {
  const uuid = req.params.uuid

  try {
    const user = await User.findOne({
      where: { uuid },
      include: ['transactions', 'cards']
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
})

app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.findAll({ include: 'user' })
    return res.json(cards)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
})

app.post('/cards', async (req, res) => {
  const { userUuid, card_type, card_cost } = req.body

  try {
    const user = await User.findOne({
      where: { uuid: userUuid }
    })
    const card = await Card.create({
      userId: user.id,
      card_type,
      card_cost
    })
    return res.json(card)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/transactions', async (req, res) => {
  const { userUuid, transaction_name, transaction_amount } = req.body

  try {
    const user = await User.findOne({
      where: { uuid: userUuid }
    })
    const transaction = await Transaction.create({
      userId: user.id,
      transaction_name,
      transaction_amount
    })
    return res.json(transaction)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ include: 'user' })
    return res.json(transactions)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
})

//Sign out route
app.get('/logout', (req, res) => {
  req.logout()
  return res.json({ msg: 'Successfully logged out.' })
})

app.listen(port, async () => {
  console.log('Server started successfully!')
  await sequelize.authenticate()
  console.log('Database connected!')
})
