import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) return null
  if (successMessage !== null) {
    return <button type="button" class="btn btn-success btn-lg btn-block" disabled>{successMessage}</button>
  } else if (errorMessage !== null) {
      return <button type="button" class="btn btn-danger btn-lg btn-block" disabled>{errorMessage}</button>
  }
  return null
}

export default Notification