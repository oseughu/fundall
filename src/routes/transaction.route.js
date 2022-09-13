import pay from '#controllers/transaction.controller'
import checkAuth from '#utils/auth'
import { Router } from 'express'

const transactionRouter = Router()

transactionRouter.post('/pay', checkAuth, pay)

export default transactionRouter
