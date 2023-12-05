const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())

// POST a user
server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    })
  } 
  else {
    User.insert(req.body)
      .then(user =>{
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
          stack: err.stack,
        })
      })
  }
})

// GET a user
server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user =>{
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        })
      }
      else res.json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "The user information could not be retrieved",
        err: err.message,
        stack: err.stack,
      })
    })
})


// GET users
server.get('/api/users', (req, res) => {
  User.find()
    .then(users =>{
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved",
        err: err.message,
        stack: err.stack,
      })
    })
})

// DELETE a user
server.delete('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    })
  }
  else {
    User.remove(req.params.id)
      .then(user =>{
        res.json(user)
      })
      .catch(err => {
        res.status(500).json({
          message: "The user could not be removed",
          err: err.message,
          stack: err.stack,
        })
      })
  }
})

// PUT (modify) a user
server.put('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    })
  }
  else if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    })
  }
  else {
    User.update(user.id, req.body)
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(err => {
        res.status(500).json({
          message: "The user information could not be modified",
          err: err.message,
          stack: err.stack,
        })
      })
  }
})

// USE when all else fails
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

module.exports = server;
