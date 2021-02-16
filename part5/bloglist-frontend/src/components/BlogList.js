import React from 'react'
import { useSelector } from 'react-redux'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'
import {
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div id="blog-list">
      <h2>blog app</h2>
      <Togglable buttonLabel="create new">
        <BlogsForm />
        <br></br>
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                {blog.user.name}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList