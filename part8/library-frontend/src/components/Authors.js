import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('Robert Martin')
  const [birthyear, setBirthyear] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor, mutationResult ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect((props) => {
    if (mutationResult.data && mutationResult.data.editAuthor === null) {
      props.setError('person not found')
    }
  }, [mutationResult.data])

  if (!props.show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, birthyear } })

    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
          {authors.map(a =>
            <option key={a.name}>
              {a.name}
            </option>
          )}
          </select>
          {/* name 
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div>
          born 
          <input
            type='number'
            value={birthyear}
            onChange={({ target }) => setBirthyear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
