import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null
        ?<button onClick={() => setPage('add')}>add book</button>
        :null}
        {token !== null
        ?<button onClick={() => setPage('recommendations')}>reocmmendations</button>
        :null}
        {token !== null
        ?<button onClick={logout} >logout</button>
        :<button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        setError={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      /> 

      <Recommendations
        show={page === 'recommendations'}
        setError={notify}
      />       

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setPage={setPage}
        setToken={setToken}
      />

    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App