import React from 'react'
import { useSelector } from 'react-redux'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'
import {
  Link
} from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const entryStyle ={
    border: 'solid',
    marginBottom: 2,
    padding: 4,
    borderWidth: 1
  }

  return (
    <div id="blog-list">
      <h2>blog app</h2>
      <Togglable buttonLabel="create new">
        <BlogsForm />
        <br></br>
      </Togglable>
      {blogs.map(blog =>
        <div key={blog.id} style={entryStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList