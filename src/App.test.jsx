import { render, screen, test, expect } from '@testing-library/react'
import App from './App'
import React from 'react'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
