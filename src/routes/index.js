import { Router } from 'express'
import { registerRouter } from '#routes/registerRouter'
import { loginRouter } from '#routes/loginRouter'
import { userRouter } from '#routes/userRouter'
import { transactionRouter } from '#routes/transactionRouter'
import { cardRouter } from '#routes/cardRouter'

export const routes = Router()

routes.use(registerRouter)
routes.use(loginRouter)
routes.use(userRouter)
routes.use(transactionRouter)
routes.use(cardRouter)
