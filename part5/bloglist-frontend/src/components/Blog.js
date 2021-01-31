import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>title: {blog.title}</p>
        <p>author: {blog.author}</p>
        <div style={hideWhenVisible} className="text-center">
          <button type="submit" className="btn btn-outline-secondary btn-block w-75 m-2" onClick={toggleVisibility}>view more</button>
        </div>
        <div style={showWhenVisible} className="invisibleAtStart" >
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button type="button" className="btn btn-sm btn-primary py-0 mx-2" onClick={likeBlog}>like</button></p>
          <div style={showWhenVisible} className="text-center">
            { user.name === blog.user.name
              ? <div>
                <button type="submit" className="btn btn-outline-secondary btn-block w-25 m-2" onClick={toggleVisibility}>hide</button>
                <button type="submit" className="btn btn-outline-danger btn-block w-25 m-2" onClick={removeBlog}>remove blog</button>
              </div>
              : <div>
                <button type="submit" className="btn btn-outline-secondary btn-block w-75 m-2" onClick={toggleVisibility}>hide</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )}

export default Blog