import { Router } from 'express'
import { login } from '#controllers/loginController'

export const loginRouter = Router()

loginRouter.post('/login', login)
