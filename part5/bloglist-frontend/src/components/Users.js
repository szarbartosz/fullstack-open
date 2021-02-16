import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link
} from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>USERS</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>created blogs</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Users