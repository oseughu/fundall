import { Router } from 'express'
import { register } from '#controllers/registerController'

export const registerRouter = Router()

registerRouter.post('/signup', register)
