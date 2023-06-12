import express from 'express'
const TFARouter = express.Router()
const TFAController = require('../database/controllers/TFA.controller')

TFARouter.post('/tfa/gen', (req, res) => TFAController.gen(req, res))
TFARouter.post('/tfa/verify', (req, res) => TFAController.verify(req, res))
TFARouter.post('/tfa/verifyCookie', (req, res) => TFAController.verifyCookie(req, res))
export default TFARouter