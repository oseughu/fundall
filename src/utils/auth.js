import User from '#models/user'
import 'dotenv/config'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

passport.use(
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
)

const checkAuth = passport.authenticate('jwt', {
  session: true
})

export default checkAuth
