
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* BEGIN - create routes here */

app.get('/users', (req, res) => res.json(users))


app.get('/users/:id', (req, res) => res.json(users.filter(user => user._id === parseInt(req.params.id))))


app.post('/users', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser)
  res.json(users)
})


app.put('/users/:id', (req, res) => {
  const found = users.filter(user => user._id === parseInt(req.params.id))

  if (found) {
    const updatedUser = req.body
    users.forEach(user => {
      if (user._id === parseInt(req.params.id)) {
        user.name = updatedUser.name ? updatedUser.name : user.name
        user.occupation = updatedUser.occupation ? updatedUser.occupation : user.occupation
        user.avatar = updatedUser.avatar ? updatedUser.avatar : user.avatar
      }
    })
  } else {
    res.status(400).json({ msg: `No user with the ID of ${req.params.id}` })
  }

  res.json(users)
})


app.delete('/users/:id', (req, res) => {
  deletedUser = users.filter(user => user._id === parseInt(req.params.id))
  console.log(deletedUser)
  deletedUser[0].isActive = false
  console.log(deletedUser)
  res.json(deletedUser)
})

/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))