import { register } from '#controllers/registerController'
import { Router } from 'express'

export const registerRouter = Router()

registerRouter.post('/signup', register)
