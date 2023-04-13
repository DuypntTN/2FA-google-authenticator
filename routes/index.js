import express from 'express'
import userRouter from './user.route'

const rootRouter = express.Router()

rootRouter.use('/api', userRouter)

export default rootRouter