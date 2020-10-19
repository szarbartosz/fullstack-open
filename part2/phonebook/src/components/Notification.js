import React from 'react'

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null) {
    if (successMessage === null) {
      return null
    } else {
      return (
        <div className="mt-4 mb-4">
          <button type="button" className="btn btn-success btn-block" disabled>{successMessage}</button>
        </div>
      )
    }
  }

  return (
    <div className="mt-4 mb-4">
      <button type="button" className="btn btn-danger btn-block" disabled>{errorMessage}</button>
    </div>
  )
}

export default Notification