import React from 'react'

const Person = ({ person, deleteEntry }) => {
  return (
  <li className="list-group-item d-flex justify-content-between">
    {person.name} {person.number}
    <button onClick={deleteEntry} className="btn btn-danger btn-sm">delete</button>
  </li>
  )
}

export default Person