import routes from '#routes'
import sequelize from '#utils/db'
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'

const port = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(routes)

// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ alter: true, match: /_test$/ })
app.listen(port, () => sequelize.sync({ alter: true }))
