import { passportMiddleware } from '#auth/passport'
import { payController } from '#controllers/transactionController'
import { Router } from 'express'

export const transactionRouter = Router()

transactionRouter.post('/pay', passportMiddleware, payController)
