import dotenv from 'dotenv'
import express from 'express'
import rootRouter from './routes'
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database/models/index')
// --------------------------------------------------

var app = express()
dotenv.config()
var port = process.env.PORT || 4000

//--------------------------------------------------
var corsOptions = {
  origin: `http://localhost:${port}}`,
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// --------------------------------------------------

app.use(rootRouter)

// --------------------------------------------------
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
