import React, { useState, useEffect, useRef } from 'react'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserPanel from './components/UserPanel'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>      
      setBlogs(blogs.sort((a, b) => 
        a.likes > b.likes ? -1 : 1
      ))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`Added a new blog to list! ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        alert(`the blog '${blog.title}' was already deleted from the server`)
        setBlogs(blogs.filter(b => b.id !== id))
      })
  }

  const removeBlog = (blog) => {
    blogService
      .remove(blog.id)
      .then(response => {
        setBlogs(blogs.filter(b => b.id !== blog.id))

        setSuccessMessage(`Deleted blog: ${blog.title}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000) 
      })
      .catch(error => {
        setErrorMessage(`${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    window.location.reload()
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />

      {
        user === null
          ? <div>
              <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
            </div>
          : <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogsForm createBlog={addBlog} />
                <br></br>
              </Togglable>
              <UserPanel user={user} handleLogout={handleLogout} blogs={blogs} createBlog={addBlog} likeBlog={likeBlog} removeBlog={removeBlog} /> 
            </div> 
      }

      
    </div>
  )
}

export default App;
