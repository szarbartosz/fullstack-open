import React from 'react'

const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <div>
      <div>find countries <input value={filter} onChange={filterChangeHandler}/></div>
    </div>
  )
}

export default Filter