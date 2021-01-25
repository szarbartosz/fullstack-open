import React from 'react'

const BlogsForm = ({ addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
        author: 
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      <div>
        url: 
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>       
      <button type="submit">save</button>
    </form>
  )
}

export default BlogsForm