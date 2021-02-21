import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }


  let books
  if (!filter) {
    books = result.data.allBooks
  } else {
    books = result.data.allBooks.filter(b => b.genres.includes(filter))
  }


  let genres = new Set()
  books.map(b => genres.add(...b.genres))

  return (
    <div>
      <h2>books</h2>

      <p>in genre: {filter === '' ? <b>all genres</b> : <b>{filter}</b>}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <br></br>

      <div>
        {Array.from(genres).map(genre =>
          <button key={genre} onClick={() => setFilter({genre}.genre)}>{genre}</button>
        )}
        <button onClick={() => setFilter()}>all genres</button>
      </div>
    </div>
  )
}

export default Books