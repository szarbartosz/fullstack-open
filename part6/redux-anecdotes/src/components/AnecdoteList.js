import React from 'react'
import { connect } from 'react-redux'
import { changeVotesOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.changeVotesOf(anecdote)
    props.setNotification(`you voted for: ${anecdote.content}`, 5)
  }

  const filter = props.filter
  const anecdotes = props.anecdotes
    .sort((x, y) =>
      x.votes > y.votes ? -1 : 1
    )
    .filter(a => new RegExp(filter, 'i').test(a.content))

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  changeVotesOf,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList