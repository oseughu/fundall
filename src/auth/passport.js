import User from '#models/user'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwtPayload.id } })
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
)

export const passportMiddleware = passport.authenticate('jwt', {
  session: false
})
