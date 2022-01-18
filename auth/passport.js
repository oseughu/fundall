const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy
const User = require('../models/user')

//Create passport strategy for user authentication
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    },
    (jwtPayload, done) => {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then(user => {
          return done(null, user)
        })
        .catch(err => {
          return done(err)
        })
    }
  )
)
