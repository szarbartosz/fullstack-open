const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})



describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of empty list is none', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toEqual(null)
  })
  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favouriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(helper.listWithOneBlog[0])
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favouriteBlog(helper.initialBlogs)
    expect(result).toEqual(helper.initialBlogs[2])
  })
})

describe('author of most blogs', () => {
  test('of empty list is none', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(null)
  })
  test('when list has only one blog, equals the author of that blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('author of most likes', () => {
  test('of empty list is none', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual(null)
  })
  test('when list has only one blog, equals the author of that blog', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})