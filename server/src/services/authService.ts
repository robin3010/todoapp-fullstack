import { Request } from 'express'
import { IUser, User } from 'src/models/userModel'
import { jwtService } from './jwtService'
import { IToken, Token } from 'src/models/tokenModel'
import { compare } from 'bcrypt'
import createError from 'http-errors'

const isUserUnique = async (username: string) => {
  const users = await User.findAll()

  if (!users.length) return true

  return !users.some(user => user.username === username)
}

export interface Credentials {
  username: string
  password: string
}

const createTokensPair = async (userId: string) => {
  const accessToken = jwtService.createToken(userId, 'access')
  const refreshToken = jwtService.createToken(userId, 'refresh')

  const token = await Token.findByPk(userId)

  if (token) {
    await token.update({ refreshToken })
  }
  if (!token) {
    await Token.create({ refreshToken, userId: userId })
  }

  return {
    accessToken,
    refreshToken,
  }
}

const createUser = async (credentials: Credentials) => {
  const { password: passwordHash, username } = credentials

  const user = await User.create({ username: username.toLowerCase(), passwordHash })

  const tokens = await createTokensPair(user.id)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: exclude, ...returnedUser } = user.toJSON()

  return { ...returnedUser, ...tokens }
}

const authUser = async (credentials: Credentials) => {
  const currentUser = await User.findOne({ where: { username: credentials.username.toLowerCase() } })

  if (!currentUser || !(await compare(credentials.password, currentUser.passwordHash))) throw new Error('Username or password incorrect')

  const tokens = await createTokensPair(currentUser.id)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...returnedUser } = currentUser.toJSON()

  return { ...returnedUser, ...tokens }
}

const exitUser = async (userId: string) => {
  const token = await Token.findByPk(userId)

  await token?.destroy()
}

export interface RequestWithCheckAuth extends Request {
  userId: string
  userToken: string
}

type IUserWithToken = IUser & { token: IToken }

const refreshUserTokens = async (req: RequestWithCheckAuth) => {
  const { userId, userToken } = req

  const currentUser = await User.findOne({ where: { id: userId }, include: Token }) as IUserWithToken

  if (userToken === currentUser.token.refreshToken) {
    return await createTokensPair(userId)
  }
  throw createError(401)
}

export const authService = {
  isUserUnique,
  createUser,
  authUser,
  exitUser,
  refreshUserTokens,
}
