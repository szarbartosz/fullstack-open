import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const CountryDetails = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <Languages languages={country.languages} />

      <img src={country.flag} alt="flag" width="200px" border="1px" />

      <Weather capital={country.capital} weather={weather} />
    </div>
  )
}

export default CountryDetails