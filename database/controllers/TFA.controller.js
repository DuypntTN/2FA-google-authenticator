const db = require('../models')
const User = db.User
const Op = db.Sequelize.Op
const { generateTFACode } = require('../../helpers/generateTFACode')
const QRCode = require('qrcode')
const { verifyTFACode } = require('../../helpers/verifyTFACode')
exports.gen = (req, res) => {
  try {
    const uid = req.body.uid
    const username = req.body.username
    // Validate request
    if (!uid) {
      res.status(400).send({
        message: 'UID can not be empty!',
      })
      return
    }
    if (!username) {
      res.status(400).send({
        message: 'Username can not be empty!',
      })
      return
    }
    // Check if user exists
    // IF user not exists, create user or if exists, handle the next step
    var condition = { uid: { [Op.eq]: `${uid}` } }
    User.findAll({ where: condition })
      .then((data) => {
        const user = data[0]
        // Handle 2 cases: user exists or not
        // Case 1: user exists -> GENERATE CODE THEN SAVE TO DB
        // Case 2: user not exists -> CREATE USER THEN GENERATE CODE THEN SAVE TO DB
        //--------------------------------------------------
        // Create user if not exists
        if (user) {
          const { active } = user
          // Check if user has active code
          if (!active) {
            // User has active code
            res.status(400).send({
              message:
                'User can not generate code because this user is disabled',
            })
            return
          }
        }
        if (!user) {
          // Create user
          const my_user = {
            username: username,
            uid: uid,
          }
          User.create(my_user).catch((err) => {
            res.status(500).send({
              message:
                err.message || 'Some error occurred while creating the User.',
            })
          })
        }

        // GENCODE
        const code = generateTFACode('ECOGIONG(' + username +'_ID_'+ uid + ')')
        const { ascii, otpauth_url } = code
        // Save code to db
        User.update(
          {
            encoding_code: ascii,
            encoding_type: 'ascii',
          },
          { where: { uid: uid } },
        )
          .then((data) => {
            // Generate QR code
            QRCode.toDataURL(otpauth_url, (err, url) => {
              res.status(200).send({
                message: 'Generate code successfully',
                url: url,
              })
            })
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while create code.',
            })
          })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while create code.',
        })
      })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while create code.',
    })
  }
}
exports.verify = (req, res) => {
  try {
    const uid = req.body.uid
    const username = req.body.username
    const token = req.body.token
    // Validate request
    if (!uid) {
      res.status(400).send({
        message: 'UID can not be empty!',
      })
      return
    }
    if (!username) {
      res.status(400).send({
        message: 'Username can not be empty!',
      })
      return
    }
    if (!token) {
      res.status(400).send({
        message: 'Token can not be empty!',
      })
      return
    }
    // Check if user exists
    // IF user not exists, create user or if exists, handle the next step
    var condition = { uid: { [Op.eq]: `${uid}` } }
    User.findAll({ where: condition })
      .then((data) => {
        const user = data[0]
        // Handle 2 cases: user exists or not
        // Case 1: user exists -> GET CODE FROM DB THEN VERIFY
        // Case 2: user not exists -> Throw error message and force user to generate code
        //--------------------------------------------------
        // user if not exists
        console.log(user)
        if (!user) {
          res.status(500).send({
            message: 'User not exists please generate code first',
          })
        }
        // Verify code
        const { encoding_code, encoding_type, active } = user.dataValues
        if (!active) {
          res.status(500).send({
            message: 'User is disabled to use this feature',
          })
        } else {
          if (encoding_code && encoding_type) {
            const verified = verifyTFACode(encoding_code, token, encoding_type)
            res.status(200).send({
              message: verified ? 'Verified' : 'Not verified',
              verified: verified,
            })
          } else {
            res.status(500).send({
              message: 'User not exists please generate code first',
            })
          }
        }
      })
      .catch((err) => {
        // res.status(500).send({
        //   message: err.message || 'Some error occurred while create code.',
        // })
      })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while create code.',
    })
  }
}
