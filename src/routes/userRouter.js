import { passportMiddleware } from '#auth/passport'
import { getUser, getUserCards, getUserTransactions } from '#controllers/userController'
import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/:uuid', passportMiddleware, getUser)

userRouter.get('/:uuid/cards', passportMiddleware, getUserCards)

userRouter.get('/:uuid/transactions', passportMiddleware, getUserTransactions)
