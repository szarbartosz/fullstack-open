import React from 'react'

const PersonForm = ({ submitHandler, nameInput, nameChangeHandler, numberInput, numberChangeHandler }) => {
  return (
    <div className="mt-4 mb-4">
      <h3>Add a new contact</h3>
      <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>name</label>
        <input value={nameInput} onChange={nameChangeHandler} placeholder="enter name" className="form-control"/>
      </div >
      <div className="form-group">
        <label>number</label>
        <input value={numberInput} onChange={numberChangeHandler} placeholder="enter number" className="form-control"/>
      </div>
        <button type="submit" className="btn btn-success btn-block">add</button>
      </form> 
    </div>
  )
}

export default PersonForm