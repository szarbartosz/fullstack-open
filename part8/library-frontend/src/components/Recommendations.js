import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommendations = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  const userResult = useQuery(GET_USER)

  const showBooks = () => {
    getBooks({ variables: { genre: user.favoriteGenre }})
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (userResult.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const user = userResult.data.me

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favoutite genre: <b>{user.favoriteGenre}</b></p>

      <button onClick={() => showBooks()} >
            show books
          </button> 
      <table>         
          {!books 
          ? null
          : <tbody>
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
            </tr>)}
            </tbody>
          }
      </table>
    </div>
  )
}

export default Recommendations