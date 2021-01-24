/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})

  const user = {
    username: 'username',
    password: 'password'
  }

  const addUserResponse = await api.post('/api/users').send(user)
  process.env.USER = addUserResponse.body

  const loginResponse = await api.post('/api/login').send(user)
  process.env.TOKEN = loginResponse.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property pf ther blog is named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Another title',
      author: 'Another author',
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Another title'
    )
  })

  test('fails when token is missing', async () => {
    const newBlog = {
      title: 'Another title',
      author: 'Another author',
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(
      'Another title'
    )
  })

  test('if the likes property is missing in the POST request, it\'s default is 0', async () => {
    const newBlog = {
      title: 'Another title',
      author: 'Another author',
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const testedBlog = blogsAtEnd.filter(b => b.title === 'Another title')
    expect(testedBlog[0].likes).toEqual(0)
  })

  test('if the title and author properties are missing in the POST request, backend responds with the status code 400', async () => {
    const newBlog = {
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if the title and url properties are missing in the POST request, backend responds with the status code 400', async () => {
    const newBlog = {
      author: 'Another author'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if title is missing in the POST request, it\'s default is untitled', async () => {
    const newBlog = {
      author: 'Author of untitled blog',
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.filter(b => b.author === 'Author of untitled blog')
    expect(titles[0].title).toEqual('untitled')
  })


  test('if author is missing in the POST request, it\'s default is author unknown', async () => {
    const newBlog = {
      title: 'Title of blog of unknown author',
      url: 'http://www.exampleblog.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.filter(b => b.title === 'Title of blog of unknown author')
    expect(authors[0].author).toEqual('author unknown')
  })
})

describe('deletion of a blog', () => {
  test('succeds with status code 204 if id is valid and user is authorised', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${process.env.TOKEN}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog number of likes', () => {
  test('succeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = 100

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

