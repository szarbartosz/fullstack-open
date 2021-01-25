import React from 'react'
import BlogList from './BlogList'
import BlogsForm from './BlogsForm'

const UserPanel = ({ userName, handleLogout, blogs, addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => {
  return (
    <div>
      <div className="card border-0 shadow w-75 mx-auto my-5 p-2">
        <div className="row">
          <div className="col-sm-2">
            <h2>blogs</h2>  
          </div>
          <div className="col-sm-6"></div>
          <div className="col-sm-2">
            <p className="pt-2">logged-in as: {userName}</p>             
          </div>
          <div className="col-sm-2">
            <button onClick={handleLogout} type="button" className="btn btn-danger">logout</button>            
          </div>
        </div>
        <hr></hr>
        <h5 className="btn disabled">add new blog</h5>
        <BlogsForm addBlog={addBlog} title={title} handleTitleChange={handleTitleChange} author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange} />
        <br></br>
        <hr></hr>
        <h5 className="btn disabled">bloglist</h5>
        <BlogList blogs={blogs} />
      </div> 
    </div>
  )
}

export default UserPanel