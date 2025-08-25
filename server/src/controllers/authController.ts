import { RequestHandler } from 'express'
import createError from 'http-errors'
import { authService, Credentials, RequestWithCheckAuth } from 'src/services/authService'

const signUp: RequestHandler = async (req, res) => {
  const body: Credentials = req.body

  if (!body || !body.username?.toLowerCase() || !body.password?.toLowerCase()) throw createError(400, 'Invalid data')

  if (await authService.isUserUnique(body.username)) {
    const createdUser = await authService.createUser(body)

    return res.status(200).json(createdUser)
  }
  throw createError(400, 'Username is already used')
}

const signIn: RequestHandler = async (req, res) => {
  const body: Credentials = req.body

  if (!body || !body.username?.toLowerCase() || !body.password?.toLowerCase()) throw createError(400, 'Invalid data')

  try {
    const authentificatedUser = await authService.authUser(body)

    return res.status(200).json(authentificatedUser)
  }
  catch (error) {
    throw createError(400, (error as Error).message)
  }
}

const signOut: RequestHandler = async (req, res) => {
  const { userId } = req as RequestWithCheckAuth

  if (userId) {
    await authService.exitUser(userId)
    res.sendStatus(200)
  }
  throw createError(500)
}

const refreshTokens: RequestHandler = async (req, res) => {
  return res.json(await authService.refreshUserTokens(req as RequestWithCheckAuth))
}

export const authController = {
  signUp,
  signIn,
  signOut,
  refreshTokens,
}
