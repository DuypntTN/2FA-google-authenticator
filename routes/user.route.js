import express from 'express'

const userRouter = express.Router()
const userController = require('../database/controllers/user.controller')
userRouter.get('/user', (req, res) => userController.findAll(req, res))
userRouter.post('/user', (req, res) => userController.create(req, res))
export default userRouter
