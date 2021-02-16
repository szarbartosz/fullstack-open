import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogsForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    dispatch(setNotification(`added blog: ${event.target.title.value}`, 5))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog(blogObject))
  }

  return (
    <form onSubmit={addBlog} className="w-50 mx-auto text-white">
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          name="title"
        />
      </div>
      <label htmlFor="author">author</label>
      <input
        name="author"
      />
      <div className="form-group">
        <label htmlFor="url">url</label>
        <input
          name="url"
        />
      </div>
      <br></br>
      <div className="w-100">
        <button type="submit" className="btn btn-primary btn-block w-100">save</button>
      </div>

    </form>
  )
}

export default BlogsForm