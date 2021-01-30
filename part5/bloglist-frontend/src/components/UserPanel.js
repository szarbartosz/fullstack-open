import React from 'react'
import BlogList from './BlogList'

const UserPanel = ({ user, handleLogout, blogs, likeBlog, removeBlog }) => {
  return (
    <div>
      <div className="card border-0 shadow w-75 mx-auto my-5 p-2">
        <div className="row text-center">
          <div className="col-sm-4">
            <h2>blogs</h2>  
          </div>
          <div className="col-sm-4">
            <p className="pt-2">logged-in as: {user.name}</p>
          </div>
          <div className="col-sm-4">
            <button onClick={handleLogout} type="button" className="btn btn-danger">logout</button>            
          </div>
        </div>
        <hr></hr>
        <BlogList blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} user={user} />
      </div> 
    </div>
  )
}

export default UserPanel