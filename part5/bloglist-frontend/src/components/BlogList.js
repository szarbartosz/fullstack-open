import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, removeBlog, user }) => {
  return (
    <div id="blog-list">
      {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog.id)} removeBlog={() => removeBlog(blog)} user={user} />)}
    </div>
  )
}

export default BlogList