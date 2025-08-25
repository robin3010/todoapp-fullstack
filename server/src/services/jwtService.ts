// import 'dotenv/config'
import jwt from 'jsonwebtoken'
import createError, { UnknownError } from 'http-errors'

const createToken = (payload: string, tokenType: 'access' | 'refresh') => {
  const tokenLastingVar = `JWT_${tokenType.toUpperCase()}_LASTING_SEC`

  if (!process.env[tokenLastingVar]) throw createError(500)

  return jwt.sign(
    { id: payload },
    process.env.JWT_SECRET!,
    {
      expiresIn: +process.env[tokenLastingVar],
    },
  )
}

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  }
  catch (error) {
    throw createError(error as UnknownError)
  }
}

export const jwtService = {
  createToken,
  verifyToken,
}
