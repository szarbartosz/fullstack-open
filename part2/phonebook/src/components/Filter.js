import React from 'react'

const Filter = ({ nameFilter, numberFilter, nameFilterChangeHandler, numberFilterChangeHandler}) => {
  return (
    <div className="mt-4 mb-4">
      <h3>Filter</h3>
      <form>
        <div className="form-group">
          <label>by name</label>
          <input value={nameFilter} onChange={nameFilterChangeHandler} className="form-control" placeholder="enter firstname or lastname..."/>
        </div>
        <div className="form-group">
          <label>by number</label>
          <input value={numberFilter} onChange={numberFilterChangeHandler} className="form-control" placeholder="enter number..."/>
        </div>
      </form>
    </div>
  )
}

export default Filter