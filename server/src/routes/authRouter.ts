import { Router } from 'express'
import { authController } from 'src/controllers/authController'
import { checkAuth } from 'src/middleware/checkAuth'

export const authRouter = Router()

authRouter.post('/register', authController.signUp)
authRouter.post('/login', authController.signIn)
authRouter.post('/logout', checkAuth, authController.signOut)
authRouter.post('/refresh', checkAuth, authController.refreshTokens)
