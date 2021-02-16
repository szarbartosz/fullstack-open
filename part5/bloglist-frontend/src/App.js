import React, { useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from 'react-router-dom'
import BlogList from './components/BlogList'
import { Button } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const userMatch = useRouteMatch('/users/:id')
  const users = useSelector(state => state.users)
  const pickedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  return (
    <div className="container">
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user !== null
          ?  <span>
            <em>{user.name} logged in</em>
            <Button onClick={() => dispatch(logout())} variant="danger" size="sm">
              logout
            </Button>
          </span>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Notification />

      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route exact path="/">
          {user !== null ? <BlogList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:id">
          {user !== null ? <User user={pickedUser}/> : <Redirect to="/login" />}
        </Route>
        <Route path="/users">
          {user !== null ? <Users /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
