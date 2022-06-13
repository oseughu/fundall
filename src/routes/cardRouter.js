import { passportMiddleware } from '#auth/passport'
import { getCard } from '#controllers/cardController'
import { Router } from 'express'

export const cardRouter = Router()

cardRouter.post('/request-card', passportMiddleware, getCard)
