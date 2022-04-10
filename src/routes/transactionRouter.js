import { Router } from 'express'
import { passportMiddleware } from '#auth/passport'
import { payController } from '#controllers/transactionController'

export const transactionRouter = Router()

transactionRouter.post('/pay', passportMiddleware, payController)
