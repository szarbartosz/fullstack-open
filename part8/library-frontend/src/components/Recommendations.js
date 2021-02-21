import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommendations = (props) => {
  const bookResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(GET_USER)

  if (bookResult.loading || userResult.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const user = userResult.data.me

  const books = bookResult.data.allBooks.filter(b => b.genres.includes(user.favoriteGenre))


  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favoutite genre: <b>{user.favoriteGenre}</b></p>

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
    </div>
  )
}

export default Recommendations