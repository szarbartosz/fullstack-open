import React from 'react'
import Person from './Person'

const Persons = ({ persons, deleteEntry }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} deleteEntry={() => deleteEntry(person)} />)}
    </ul>
  )
}

export default Persons

