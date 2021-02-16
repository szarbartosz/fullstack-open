const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    if (queue.length > 1) {
      clearTimeout(queue.shift())
    }
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

let queue = []

export const setNotification = (message, timeout) => {
  return async dispatch => {
    const id = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    queue = [...queue, id]
    console.log(queue)
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