import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

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
      <div className="card border-0 shadow w-50 mx-auto my-5">
        <h3 className="card-header">log in to application</h3>
        <div className="card-body p-5">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control"
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                className="form-control"
                name="password"
              />
            </div>
            <br></br>
            <button type="submit" id="login-button" className="btn btn-primary w-100">login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm