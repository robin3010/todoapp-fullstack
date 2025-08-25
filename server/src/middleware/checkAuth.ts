import { RequestHandler } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { RequestWithCheckAuth } from 'src/services/authService'
import { jwtService } from 'src/services/jwtService'

type JwtDecodedPayload = JwtPayload & { id: string }

export const checkAuth: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401)
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    if (token) {
      const { id } = jwtService.verifyToken(token) as JwtDecodedPayload

      (req as RequestWithCheckAuth).userId = id;
      (req as RequestWithCheckAuth).userToken = token
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    return res.sendStatus(401)
  }

  return next()
}
