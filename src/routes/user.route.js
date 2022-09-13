import {
  getUser,
  getUserCards,
  getUserTransactions
} from '#controllers/user.controller'
import checkAuth from '#utils/auth'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:uuid', checkAuth, getUser)
userRouter.get('/:uuid/cards', checkAuth, getUserCards)
userRouter.get('/:uuid/transactions', checkAuth, getUserTransactions)

export default userRouter
