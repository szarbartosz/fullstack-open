import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) return null
  if (successMessage !== null) {
    return <button type="button" className="btn btn-success btn-lg btn-block w-100" disabled>{successMessage}</button>
  } else if (errorMessage !== null) {
      return <button type="button" className="btn btn-danger btn-lg btn-block w-100" disabled>{errorMessage}</button>
  }
  return null
}

export default Notification