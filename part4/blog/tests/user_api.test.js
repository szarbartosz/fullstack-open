const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('../tests/test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('invalid user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('is not created when username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Karl Johanson',
      password: 'passwd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('is not created when password is missing or has less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'Karl Johanson',
      password: 'p'
    }

    const secondUser = {
      username: 'username',
      name: 'Karl Johanson',
    }

    const firstResult = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(firstResult.body.error).toContain('`password` is required and has to be at least 3 characters long')

    const secondResult = await api
      .post('/api/users')
      .send(secondUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(secondResult.body.error).toContain('`password` is required and has to be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})