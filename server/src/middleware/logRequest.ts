import morgan from 'morgan'

export const logMiddleware = () => {
  const customFormat = ':method :url :status :response-time ms - :remote-addr'

  return morgan(customFormat)
}
