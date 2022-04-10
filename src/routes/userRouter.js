import { Router } from 'express'
import { passportMiddleware } from '#auth/passport'
import { getUser } from '#controllers/userController'
import { getUserCards } from '#controllers/userController'
import { getUserTransactions } from '#controllers/userController'

export const userRouter = Router()

userRouter.get('/:uuid', passportMiddleware, getUser)

userRouter.get('/:uuid/cards', passportMiddleware, getUserCards)

userRouter.get('/:uuid/transactions', passportMiddleware, getUserTransactions)
