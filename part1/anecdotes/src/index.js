import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
<p>has {props.quantity} votes</p>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( new Array(anecdotes.length).fill(0) )

  const getRandom = (min, max) => (
    min + Math.floor((max - min) * Math.random())
  )

  const handleNextClick = () => {
    let oldIndex = selected
    let newIndex = oldIndex
    
    while (newIndex === oldIndex){
      newIndex = getRandom(0, anecdotes.length)
    }
    
    setSelected(newIndex)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    
    copy[selected] += 1

    setPoints(copy)
  }

  const getIndexOfMax = (arr) => {
    let max = arr[0]
    let maxIndex = 0

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i
        max = arr[i]
      }
    }

    return maxIndex
  }

  return (
    <div>

      <h1>Anectode of the day</h1>
      
      <div>
        {props.anecdotes[selected]}
      </div>
      
      <Statistic quantity={points[selected]}/>
      
      <Button text={'vote'} onClick={handleVoteClick}/>
      <Button text={'next anecdote'} onClick={handleNextClick}/>
      
      <h1>Anectode with most votes</h1>
      
      <div>
        {props.anecdotes[getIndexOfMax(points)]}
      </div>
      
      <Statistic quantity={points[getIndexOfMax(points)]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)