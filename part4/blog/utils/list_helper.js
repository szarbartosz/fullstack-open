// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max.apply(Math, blogs.map(blog => blog.likes))

  return blogs.find(({ likes }) => likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = Array.from(new Set(blogs.map(blog => blog.author)))
  const authorBlogs = authors.map(author => ({
    author,
    blogs: blogs.filter(blog => blog.author === author).length
  }))

  const maxBlogs = Math.max.apply(Math, authorBlogs.map(authorBlogs => authorBlogs.blogs))

  return authorBlogs.find(({ blogs }) => blogs === maxBlogs)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors = Array.from(new Set(blogs.map(blog => blog.author)))
  const authorLikes = authors.map(author => ({
    author,
    likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0)
  }))

  const maxLikes = Math.max.apply(Math, authorLikes.map(authorLikes => authorLikes.likes))

  return authorLikes.find(({ likes }) => likes === maxLikes)
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}

