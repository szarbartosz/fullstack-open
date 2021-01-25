import React from 'react'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (
    <div>
      <h1>log in to application</h1>
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
        <button type="submit" className="btn btn-primary">login</button>
      </form>
    </div>
  )
}

export default LoginForm