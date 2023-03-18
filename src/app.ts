import express, { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express();

import authRoutes from './routes/auth'

app.set('PORT', 4000)

// middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)

export default app