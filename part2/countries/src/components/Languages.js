import React from 'react'

const Laguages = ({ languages }) => {
  return (
    <div>
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>) }
      </ul>
    </div>
  )
}

export default Laguages