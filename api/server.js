const express = require('express')
const User = require('./users/model')
/* User =
  find()
  findById(id)
  insert({ name, bio })
  update(id, changes)
  remove(id)
*/
const server = express()

// POST a user
/*
- If the request body is missing the `name` or `bio` property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.

- If the information about the _user_ is valid:

  - save the new _user_ the the database.
  - respond with HTTP status code `201` (Created).
  - return the newly created _user document_ including its id.

- If there's an error while saving the _user_:
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ message: "There was an error while saving the user to the database" }`.
*/
server.post('/api/users', (req, res) => {

})

// GET a user
server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user =>{
      if (!user) res.status(404).json({
        message: "The user with the specified ID does not exist" 
      })
      res.json(user)
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

// DELETE a user (and get back the deleted user)
/*
- If the _user_ with the specified `id` is not found:

  - respond with HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

- If there's an error in removing the _user_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ message: "The user could not be removed" }`.
*/
server.delete('/api/users/:id', (req, res) => {
  
})

// PUT a user (and get back the modified user)
/*
- If the _user_ with the specified `id` is not found:

  - respond with HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The user with the specified ID does not exist" }`.

- If the request body is missing the `name` or `bio` property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.

- If there's an error when updating the _user_:

  - respond with HTTP status code `500`.
  - return the following JSON object: `{ message: "The user information could not be modified" }`.

- If the user is found and the new information is valid:

  - update the user document in the database using the new information sent in the `request body`.
  - respond with HTTP status code `200` (OK).
  - return the newly updated _user document_.
*/
server.put('/api/users/:id', (req, res) => {
  
})

// USE when all else fails
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found'
  })
})

module.exports = server;
