import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    name: 'example name'
  }

  const blog = {
    author: 'example author',
    title: 'example title',
    url: 'example url',
    likes: 0,
    user: user
  }

  const likeBlog = jest.fn()
  const removeBlog = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} removeBLog={removeBlog} user={user} />
    )
  })

  test('only blog title and author is visible after render', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('author:')
    expect(div).toHaveTextContent('title:')

    const hidden = component.container.querySelector('.invisibleAtStart')
    expect(hidden).toHaveStyle('display: none')
    expect(hidden).toHaveTextContent('url:')
    expect(hidden).toHaveTextContent('likes:')
  })

  test('url and likes are shown after clicking \'view more\' button', () => {
    const button = component.getByText('view more')
    fireEvent.click(button)

    const div = component.container.querySelector('.invisibleAtStart')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('url:')
    expect(div).toHaveTextContent('likes:')
  })

  test('event handler is called twice after clicking \'like\' button two times', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

