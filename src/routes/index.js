import authRouter from '#routes/auth.route'
import cardRouter from '#routes/card.route'
import transactionRouter from '#routes/transaction.route'
import userRouter from '#routes/user.route'
import { Router } from 'express'

const routes = Router()

routes.use(cardRouter, authRouter, transactionRouter, userRouter)

export default routes
