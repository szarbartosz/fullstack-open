import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
  {text}
  </button> 
)

const Statistic = ({name, value}) => (
  <tr>
    <td>
      <p>{name}</p>
    </td>
    <td>
      <p>{value}</p>
    </td>
  </tr>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const calcAverage = (good, bad, total) => {
    let result = 'not available yet'
    if (total !== 0) {
      result = (good - bad) / total
    }
    return result
  }

  const calcPositive = (good, total) => {
    let result = 'not available yet'
    if (total !== 0) {
      result = (good / total) * 100 + '%'
    }
    return result
  }

  return (
    <table>
      <tbody>
        <Statistic name={'good'} value={props.good}/>
        <Statistic name={'neutral'} value={props.neutral}/>
        <Statistic name={'bad'} value={props.bad}/>
        <Statistic name={'all'} value={props.total}/>
        <Statistic name={'average'} value={calcAverage(props.good, props.bad, props.total)}/>
        <Statistic name={'positive'} value={calcPositive(props.good, props.total)}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good + neutral + bad

  const handleGoodClick = () => {
    setGood(good + 1)   
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const hanndleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'}/>
      <Button onClick={handleNeutralClick} text={'neutral'}/>
      <Button onClick={hanndleBadClick} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)