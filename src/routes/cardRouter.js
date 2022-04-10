import { Router } from 'express'
import { passportMiddleware } from '#auth/passport'
import { getCard } from '#controllers/cardController'

export const cardRouter = Router()

cardRouter.post('/request-card', passportMiddleware, getCard)
