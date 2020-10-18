import React from 'react'

const Country = ({ countryName, filterChangeHandler }) => {
  return (
    <li>
      <div>
      {countryName} <button onClick={() => filterChangeHandler(countryName)}>show</button>
      </div>      
    </li>
  )
}

export default Country