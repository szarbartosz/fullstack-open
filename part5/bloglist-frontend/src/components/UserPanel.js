import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import BlogList from './BlogList'

const UserPanel = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
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
            <button onClick={() => dispatch(logout())} type="button" className="btn btn-danger">logout</button>
          </div>
        </div>
        <hr></hr>
        <BlogList user={user} />
      </div>
    </div>
  )
}

export default UserPanel