import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeBlog, removeBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleCommentAddition = async (event) => {
    event.preventDefault()
    const comment = {
      content: event.target.comment.value
    }

    event.target.comment.value = ''

    dispatch(addComment(blog.id, comment))
  }


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
      <br></br>
      <form onSubmit={handleCommentAddition}>
        <div>
          <input
            type="text"
            className="form-control"
            name="comment"
          />
          <Button type="submit" variant="primary" size="sm">
            add comment
          </Button>
        </div>
      </form>
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