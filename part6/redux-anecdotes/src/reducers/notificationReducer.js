const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default: 
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer