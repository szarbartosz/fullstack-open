import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogsForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    dispatch(setNotification(`added blog: ${event.target.title.value}`, 5))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog(blogObject))
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          type="url"
          name="url"
        />
        <Button variant="primary" type="submit" size="sm">
            create new
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BlogsForm