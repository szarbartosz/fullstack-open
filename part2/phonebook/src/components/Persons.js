import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteEntry }) => {
  return (
    <div className="mt-4 mb-4">
      <h3>Contacts</h3>
      <ul className="list-group">
        {persons.map(person => <Person key={person.name} person={person} deleteEntry={() => deleteEntry(person)} />)}
      </ul>
    </div>
  )
}

export default Persons

