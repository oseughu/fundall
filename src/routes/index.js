import { cardRouter } from '#routes/cardRouter'
import { loginRouter } from '#routes/loginRouter'
import { registerRouter } from '#routes/registerRouter'
import { transactionRouter } from '#routes/transactionRouter'
import { userRouter } from '#routes/userRouter'
import { Router } from 'express'

export const routes = Router()

routes.use(cardRouter)
routes.use(loginRouter)
routes.use(registerRouter)
routes.use(transactionRouter)
routes.use(userRouter)
