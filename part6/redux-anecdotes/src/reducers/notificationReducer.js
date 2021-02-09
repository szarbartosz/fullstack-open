const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTE_NOTIFICATION':
      return `you voted for: ${action.anecdote}`
    case 'NEW_ANECDOTE_NOTIFICATION':
      return `you added: ${action.anecdote}`
    case 'CLEAR_NOTIFICATION':
      return ''
    default: 
      return state
  }
}

export const notifyAboutVoting = (anecdote) => {
  return {
    type: 'VOTE_NOTIFICATION',
    anecdote: anecdote
  }
}

export const notifyAboutAddition = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE_NOTIFICATION',
    anecdote: anecdote
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer