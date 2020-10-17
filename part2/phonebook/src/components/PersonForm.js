import React from 'react'

const PersonForm = ({ submitHandler, nameInput, nameChangeHandler, numberInput, numberChangeHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>name: <input value={nameInput} onChange={nameChangeHandler}/></div>
      <div>number: <input value={numberInput} onChange={numberChangeHandler}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm