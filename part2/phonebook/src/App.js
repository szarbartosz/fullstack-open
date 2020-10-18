import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let filteredPersons = persons.filter(person => person.name === newName)
    
    if (filteredPersons.length > 0) {
      let id = filteredPersons[0].id
      let isConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (isConfirmed) {
        updateNumber(id, newNumber)
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')  
        })
    }
  }

  const updateNumber = (id, number) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: number}
    console.log(changedPerson)

    personService
    .updateNumber(id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(p => p.id === id ? p = returnedPerson : p))
    })
    .catch(error => {
      console.log(error);
      alert(`the person '${person.name}' was already deleted from the server!`)
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const deleteEntry = person => {
    let isConfirmed = window.confirm(`delete ${person.name}?`)

    if (isConfirmed) {
      personService
      .deleteEntry(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        console.log(`${person.name} deleted succesfully`);
      })
      .catch(error => {
        console.log(error);
        alert(`${person.name} was already deleted from the server!`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={newFilter} filterChangeHandler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm submitHandler={addPerson} nameInput={newName} nameChangeHandler={handleNameChange}
        numberInput={newNumber} numberChangeHandler={handleNumberChange} />      
      
      <h2>Numbers</h2>

      <Persons persons={persons.filter(person => new RegExp(newFilter, 'i').test(person.name))} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App