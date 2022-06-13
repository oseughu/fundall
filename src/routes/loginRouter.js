import { login } from '#controllers/loginController'
import { Router } from 'express'

export const loginRouter = Router()

loginRouter.post('/login', login)
