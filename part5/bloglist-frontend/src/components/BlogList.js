import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>TITLE</th>
          <th>AUTHOR</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </tbody>
    </table>
  )
}

export default BlogList