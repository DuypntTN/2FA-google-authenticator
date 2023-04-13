const db = require('../models')
const User = db.User
const Op = db.Sequelize.Op

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a User
  const user = {
    username: req.body.username,
    uid: req.body.uid,
    encoding_code: req.body.encoding_code,
    encoding_type: req.body.encoding_type,
  }

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user.',
      })
    })
}

// Find a single User with an id
exports.findOne = (req, res) => {}

// Update a User by the id in the request
exports.update = (req, res) => {}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {}

// Delete all User from the database.
exports.deleteAll = (req, res) => {}

// Find all published User
exports.findAllPublished = (req, res) => {}
