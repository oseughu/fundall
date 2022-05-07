import 'dotenv/config'
import express, { urlencoded, json } from 'express'
import session from 'express-session'
import morgan from 'morgan'
import { routes } from '#routes'
import { sequelize } from '#config/db'

const port = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(routes)

app.listen(port, () => sequelize.authenticate())
