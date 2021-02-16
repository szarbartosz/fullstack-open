import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
  let user = null
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
  }
  return {
    type: 'INIT_USER',
    data: user
  }
}

export const login = (userObject) => {
  return async dispatch => {
    const user = await loginService.login(userObject)
    window.localStorage.setItem(
      'loggedBlogsAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogsAppUser')
  window.location.reload()
  return {
    type: 'LOGOUT',
    data: null
  }
}

export default loginReducer