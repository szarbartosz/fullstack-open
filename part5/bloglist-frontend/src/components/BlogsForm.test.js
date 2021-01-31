import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogsForm from './BlogsForm'

describe('<BlogsForm />', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogsForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  test('the form calls the event handler it received as props, when a new blog is created', () => {
    fireEvent.change(title, {
      target: { value: 'Astrophysics in XXI century' }
    })
    fireEvent.change(author, {
      target: { value: 'Erik Jakobsen' }
    })
    fireEvent.change(url, {
      target: { value: 'www.astrophysicsjakobsen.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Astrophysics in XXI century')
    expect(createBlog.mock.calls[0][0].author).toBe('Erik Jakobsen')
    expect(createBlog.mock.calls[0][0].url).toBe('www.astrophysicsjakobsen.com')
  })
})