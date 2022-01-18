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

const { sequelize, User, Transaction, Card } = require('./models')
const user = require('./models/user')

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

app.use(passport.initialize())
app.use(passport.session())

//Create passport strategy for user authentication
passport.use(User.createStrategy())

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id: user.id } }, function (err, user) {
    done(err, user)
  })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  try {
    if (!user) {
      return res.json({ message: 'Email or password does not match!' })
    } else if (user.password != password) {
      return res.json({ message: 'Email or password does not match!' })
    } else {
      const user = new User({
        //Local authentication checks if username and password match
        username: email,
        password
      })
      req.login(user, err => {
        if (err) {
          console.log(err)
        } else {
          passport.authenticate('local')(req, res, () => {
            res.redirect('images')
          })
        }
      })
      return res.json({
        msg: 'Welcome to Fundall!!'
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

app.get('/user/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  if (req.isAuthenticated()) {
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
  } else {
    return res.json({ error: 'User not logged in.' })
  }
})

app.get('/:uuid/cards', async (req, res) => {
  const userUuid = req.params.uuid

  if (req.isAuthenticated()) {
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
  } else {
    return res.json({ error: 'User not logged in.' })
  }
})

app.post('/request-card', async (req, res) => {
  const { userUuid, card_type, card_cost } = req.body
  if (req.isAuthenticated()) {
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
  } else {
    return res.json({ error: 'User not logged in.' })
  }
})

app.post('/pay', async (req, res) => {
  const { userUuid, transaction_name, transaction_amount } = req.body

  if (req.isAuthenticated()) {
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
  } else {
    return res.json({ error: 'User not logged in.' })
  }
})

app.get('/:uuid/transactions', async (req, res) => {
  const userUuid = req.params.uuid

  if (req.isAuthenticated()) {
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
  } else {
    return res.json({ error: 'User not logged in.' })
  }
})

app.listen(port, async () => {
  console.log('Server started successfully!')
  await sequelize.authenticate()
  console.log('Database connected!')
})
