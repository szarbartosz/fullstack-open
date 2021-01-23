const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, repsonse) => {
  const users = await User.find({})
  repsonse.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined || body.password.length < 3) {
    return response.status(400).json({ error: '`password` is required and has to be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter