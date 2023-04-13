import express from 'express'
import userRouter from './user.route'
import TFARouter from './TFA.route'

const rootRouter = express.Router()

rootRouter.use('/api', userRouter)
rootRouter.use('/api', TFARouter)
export default rootRouter