import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p id="likes-paragraph">{blog.likes} likes<button type="button" id="like-button" className="btn btn-sm btn-primary py-0 mx-2" onClick={() => dispatch(likeBlog(blog.id))}>like</button></p>
      <p>added by {user.name}</p>
      { user.name === blog.user.name
        ? <div>
          <button type="submit" id="delete-button" className="btn btn-outline-danger btn-block w-25 m-2" onClick={() => dispatch(removeBlog(blog.id))}>remove blog</button>
        </div>
        : null
      }
      {
        blog.comments
          ? <div>
            <h4>comments:</h4>
            <ul>
              {
                blog.comments.map((comment, index) =>
                  <li key={index}>{comment}</li>
                )}
            </ul>
          </div>
          : null
      }

    </div>
  )}

export default Blog