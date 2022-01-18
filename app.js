//Require all the necessary modules
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const port = process.env.PORT || 3000
const Joi = require('joi')
const morgan = require('morgan')
const passport = require('passport')
const jwt = require('jsonwebtoken')
require('./auth/passport')(passport)

const { sequelize, User, Transaction, Card } = require('./models')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

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
      return res.json({
        msg: 'Welcome to Fundall! Please copy your jwt token to view your cards and transactions!',
        token: jwtToken
      })
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

app.get(
  '/user/:uuid',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
  }
)

app.get(
  '/:uuid/cards',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userUuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid: userUuid }
      })
      const cards = await Card.findAll({
        where: { userId: user.id }
      })
      return res.json(cards)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }
)

app.post(
  '/request-card',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { userUuid, card_type, card_cost } = req.body

    try {
      const user = await User.findOne({
        where: { uuid: userUuid }
      })
      const card = new Card({
        userId: user.id,
        card_type,
        card_cost
      })
      await card.save()
      return res.json(card)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
)

app.post(
  '/pay',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
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
      payment.save()
      return res.json(payment)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
)

app.get(
  '/:uuid/transactions',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userUuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid: userUuid }
      })
      const transactions = Transaction.findAll({
        where: { userId: user.id }
      })
      return res.json(transactions)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong.' })
    }
  }
)

app.listen(port, async () => {
  try {
    console.log('Server started successfully!')
    await sequelize.authenticate()
    console.log('Database connected!')
  } catch (err) {
    console.log(err)
  }
})
