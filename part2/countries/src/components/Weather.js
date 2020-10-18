import React from 'react'

const Weather = ({ capital, weather }) => {
  return (
    <div>
      <h3>weather in {capital}:</h3>

      <p>temperature: {weather.temperature}°C</p>
      <p>wind: {weather.wind_speed}km/h direction {weather.wind_dir}</p>

      <img src={weather.weather_icons} alt="weather icon" width="100px" border="1px" />
    </div>
  )
}

export default Weather