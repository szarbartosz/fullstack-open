import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(changeVotesOf(anecdote))
    dispatch(setNotification(`you voted for: ${anecdote.content}`, 5))
  }

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.sort((x, y) =>
    x.votes > y.votes ? -1 : 1
  )).filter(a => new RegExp(filter, 'i').test(a.content))

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList