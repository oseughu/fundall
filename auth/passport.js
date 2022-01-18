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
      const user = await User.findOne({ where: { id: jwtPayload.id } })
      return done(null, user)
    }
  )
)
