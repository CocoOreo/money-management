/* eslint-disable no-undef */
import React from 'react'
import { CalendarHeader } from './index.jsx'
import { render, fireEvent } from '@testing-library/react'

const onScopeChange = (item) => {
  console.log('Now the scope is ', item)
}

const onTypeChange = (item) => {
  console.log('Now the type is ', item)
}
const createHeader = () => {
  const currentScope = 0
  const currentType = 0
  return (
        <CalendarHeader onScopeChange={onScopeChange}
        onTypeChange={onTypeChange}
        currentScope={currentScope}
        currentType={currentType} />
  )
}
test('Calendar Header should have a type tag indicating now is in Expense status', () => {
  const wrapper = render(createHeader())
  const scopeTag = wrapper.getByText('EXPENSE')
  expect(scopeTag).toBeVisible()
})

test('Calendar Header should have a week tabs', () => {
  const wrapper = render(createHeader())
  const week = wrapper.getAllByText('WEEK')
  const month = wrapper.getAllByText('MONTH')
  const year = wrapper.getAllByText('YEAR')
  week.forEach((item) => expect(item).toBeVisible())
  month.forEach((item) => expect(item).toBeVisible())
  year.forEach((item) => expect(item).toBeVisible())
})

test('Calendar Header should have a month tabs', () => {
  const wrapper = render(createHeader())
  const month = wrapper.getAllByText('MONTH')
  month.forEach((item) => expect(item).toBeVisible())
})

test('Calendar Header should have a year tabs', () => {
  const wrapper = render(createHeader())
  const year = wrapper.getAllByText('YEAR')
  year.forEach((item) => expect(item).toBeVisible())
})

test('When clicking default tab WEEK, it will not trigger onScopeChange event', () => {
  const onScopeChange = jest.fn()
  const wrapper = render(<CalendarHeader
    onScopeChange={onScopeChange}
    onTypeChange={onTypeChange}
    currentScope={0}
    currentType={0} />)
  const week = wrapper.getAllByText('WEEK')
  week.forEach(item => fireEvent.click(item))
  expect(onScopeChange.mock.calls.length).toBe(0)
})

test('When clicking other tabs like month or year, it will trigger onScopeChange event', () => {
  const onScopeChange = jest.fn()
  const wrapper = render(<CalendarHeader
      onScopeChange={onScopeChange}
      onTypeChange={onTypeChange}
      currentScope={0}
      currentType={0} />)
  const month = wrapper.getAllByText('MONTH')
  const year = wrapper.getAllByText('YEAR')
  month.forEach(item => fireEvent.click(item))
  expect(onScopeChange.mock.calls.length).toBe(1)
  year.forEach(item => fireEvent.click(item))
  expect(onScopeChange.mock.calls.length).toBe(2)
})

test('When clicking exchange Icon, it will trigger onTypeChange event', () => {
  const onTypeChange = jest.fn()
  const wrapper = render(<CalendarHeader
        onScopeChange={onScopeChange}
        onTypeChange={onTypeChange}
        currentScope={0}
        currentType={0} />)
  const exchange = wrapper.getByTestId('exchange')
  fireEvent.click(exchange)
  expect(onTypeChange.mock.calls.length).toBe(1)
})

test('With defalut type 1, when clicking exchange Icon, it will trigger onTypeChange event', () => {
  const onTypeChange = jest.fn()
  const wrapper = render(<CalendarHeader
          onScopeChange={onScopeChange}
          onTypeChange={onTypeChange}
          currentScope={1}
          currentType={1} />)
  const exchange = wrapper.getByTestId('exchange')
  fireEvent.click(exchange)
  expect(onTypeChange.mock.calls.length).toBe(1)
})
