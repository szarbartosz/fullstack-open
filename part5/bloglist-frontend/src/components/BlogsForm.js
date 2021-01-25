import React from 'react'

const BlogsForm = ({ addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog} className="w-50 mx-auto">
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
      <button type="submit" className="btn btn-primary btn-block">save</button>
      </div>
      
    </form>
  )
}

export default BlogsForm