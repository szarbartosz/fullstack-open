import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeVotesOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(changeVotesOf(id))
  }

  const anecdotes = useSelector(state => state.sort((x, y) =>
    x.votes > y.votes ? -1 : 1
  ))

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList