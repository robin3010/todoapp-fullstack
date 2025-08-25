import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import { apiRouter } from './routes/apiRouter'
import { handleErrors, handleNotFound } from './middleware/handleError'

const app = express()

app.use(cors(), express.json(), morgan('dev'))

app.use('/api/v1', apiRouter)

app.use(handleNotFound, handleErrors)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`))
