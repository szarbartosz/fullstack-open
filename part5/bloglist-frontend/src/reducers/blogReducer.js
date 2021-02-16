/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data.updatedBlog
    )
  case 'DELETE':
    return state.filter(blog =>
      blog.id !== action.data.id
    )
  case 'ADD_COMMENT':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data.updatedBlog
    )
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) =>
      a.likes > b.likes ? -1 : 1
    )
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blogToUpdate = await blogService.getOne(id)
    const changedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    const updatedBlog = await blogService.update(id, changedBlog)
    dispatch({
      type: 'LIKE',
      data: {
        id,
        updatedBlog
      }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    console.log(updatedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        id,
        updatedBlog
      }
    })
  }

}

export default blogReducer