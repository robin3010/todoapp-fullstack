import { Router } from 'express'
import { authRouter } from './authRouter'
import { todosRouter } from './todosRouter'

export const apiRouter = Router()

apiRouter.use('/', authRouter)
apiRouter.use('/todos', todosRouter)
