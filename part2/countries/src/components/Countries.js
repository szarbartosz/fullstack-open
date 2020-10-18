import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, filterChangeHandler, weather, weatherHandler }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches ({countries.length}), specify another filter</p>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <ol>
        {countries.map(country => <Country key={country.name} countryName={country.name} filterChangeHandler={filterChangeHandler} />)}
      </ol>
    )
  } else if (countries.length === 1)  {
    weatherHandler(countries[0].capital)
    return (
      <div>
        <CountryDetails country={countries[0]} weather={weather} />
      </div>
    )
  } else {
    return (
      <div>
        <p>no matches found</p>
      </div>
    )
  }
}

export default Countries