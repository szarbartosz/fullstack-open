import React from 'react'
import BlogList from './BlogList'
import BlogsForm from './BlogsForm'

const UserPanel = ({ userName, handleLogout, blogs, addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{userName} logged-in <button onClick={handleLogout} type="button" class="btn btn-danger">logout</button></p>
      <BlogsForm addBlog={addBlog} title={title} handleTitleChange={handleTitleChange} author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange} />
      <BlogList blogs={blogs} />
    </div>
  )
}

export default UserPanel