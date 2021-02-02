import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (
    <div>
      <div className="card border-0 shadow w-50 mx-auto my-5">
        <h5 className="card-header">log in to application</h5>
        <div className="card-body p-5">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)} />
            </div>
            <br></br>
            <button type="submit" id="login-button" className="btn btn-primary w-100">login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm