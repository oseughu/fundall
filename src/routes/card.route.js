import { getCard } from '#controllers/card.controller'
import checkAuth from '#utils/auth'
import { Router } from 'express'

 const cardRouter = Router()

cardRouter.post('/request-card', checkAuth, getCard)

export default cardRouter