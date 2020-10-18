import React, { useEffect, useState } from 'react';
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const weatherHandler = (capital) => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: capital
        }
      })
      .then(response => {
        setWeather(response.data.current);
      })
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const showCountry = (name) => {
    setNewFilter(name)
  }

  return (
    <div>
      <h2>data for countries</h2>

      <Filter filter={newFilter} filterChangeHandler={handleFilterChange} />

      <Countries countries={countries.filter(country => new RegExp(newFilter, 'i').test(country.name))} filterChangeHandler={showCountry} weather={weather} weatherHandler={weatherHandler}/>
    </div>
  );
}

export default App;
