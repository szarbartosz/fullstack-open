import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')
  const [ newNumberFilter, setNewNumberFilter ] = useState('')
  const [ succesMessage, setSuccessMesage ] = useState(null)
  const [ errorMessage, setErrorMesage ] = useState(null)

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

  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }

  const handleNumberFilterChange = (event) => {
    setNewNumberFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()        
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

        setSuccessMesage(`Added to contacts: ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMesage(null)
        }, 5000)  
      })
      .catch(error => {
        setNewName('')
        setNewNumber('')

        setErrorMesage(error.response.data.error)
        setTimeout(() => {
          setErrorMesage(null)
        }, 5000)  
        console.log(error.response.data)
      })
  }

  const deleteEntry = person => {
    let isConfirmed = window.confirm(`delete ${person.name}?`)

    if (isConfirmed) {
      personService
      .deleteEntry(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))

        setSuccessMesage(`Deleted information of: ${person.name}`)
        setTimeout(() => {
          setSuccessMesage(null)
        }, 5000)  
      })
      .catch(error => {
        setErrorMesage(`Information of: ${person.name} has already been removed from the server!`)
        setTimeout(() => {
          setErrorMesage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <hr/>

      <Notification successMessage={succesMessage} errorMessage={errorMessage} />

      <PersonForm submitHandler={addPerson} nameInput={newName} nameChangeHandler={handleNameChange}
        numberInput={newNumber} numberChangeHandler={handleNumberChange} />      

      <Filter nameFilter={newNameFilter} numberFilter={newNumberFilter} 
        nameFilterChangeHandler={handleNameFilterChange}  numberFilterChangeHandler={handleNumberFilterChange}/>
      
      <Persons persons={persons
                        .filter(person => new RegExp(newNameFilter, 'i').test(person.name))
                        .filter(person => new RegExp(newNumberFilter).test(person.number))
                      } deleteEntry={deleteEntry} />
    </div>
  )
}

export default App