import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    event.target.username.value = ''
    event.target.password.value = ''

    await dispatch(login(userObject))
    history.push('/')
  }
  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant="primary" type="submit" size="sm">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm