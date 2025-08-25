import { ErrorRequestHandler, RequestHandler } from 'express'
import createError, { HttpError } from 'http-errors'

export const handleNotFound: RequestHandler = (_req, _res, next) => {
  next(createError(404))
}

export const handleErrors: ErrorRequestHandler = (error, _req, res, next) => {
  const status = (error instanceof HttpError) ? error.status : 500

  if (res.headersSent) {
    return next(error)
  }

  res.status(status).json({
    status,
    message: error.message,
  })
}
