import React, { useState } from 'react'

const BlogsForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog ({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className="w-50 mx-auto text-white">
      <div className="form-group">
        <label htmlFor="title">title</label>
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="form-control"
        />
      </div>
      <label htmlFor="author">author</label>
      <input
        id="author"
        value={author}
        onChange={handleAuthorChange}
        className="form-control"
      />
      <div className="form-group">
        <label htmlFor="url">url</label>
        <input
          id="url"
          value={url}
          onChange={handleUrlChange}
          className="form-control"
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