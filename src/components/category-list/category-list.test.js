import React from 'react'
import {
  render,
  fireEvent,
  getByTestId,
  getAllByTestId
} from '@testing-library/react'
import { CategoryList } from './index.jsx'
import { expenseTab, incomeTab } from 'config/tabs'

const onFinish = (record) => {
  console.log('record', record)
}

const createCategoryList = (tabType) => {
  const list = tabType.list
  const type = tabType.name
  return (
    <CategoryList
      type={type}
      onClick={(param) => onClickIcon(param)}
      onFinish={onFinish}
      list={list}
    />
  )
}

test('Category List in expense mode should contain tab Grocery', () => {
  const wrapper = render(createCategoryList(expenseTab))
  const scopeTag = wrapper.getByText('Grocery')
  expect(scopeTag).toBeVisible()
})

test('Category List in income mode should contain tab Salary', () => {
  const wrapper = render(createCategoryList(incomeTab))
  const scopeTag = wrapper.getByText('Salary')
  expect(scopeTag).toBeVisible()
})

test('After icon is clicked, number keypad should show up', () => {
  const wrapper = render(createCategoryList(expenseTab))
  const icon = wrapper.getAllByTestId('cart-o')
  fireEvent.click(icon[1])
  const amount = wrapper.getByTestId('amount')
  expect(amount).toBeVisible()
})

test('After the star icon in number keypad is clicked, the calendar should show up', () => {
  const wrapper = render(createCategoryList(expenseTab))
  const icon = wrapper.getAllByTestId('cart-o')
  fireEvent.click(icon[1])
  const star = wrapper.getByText('☆')
  expect(star).toBeVisible()
  fireEvent.click(star)
  const calendar = wrapper.getByTestId('calendar')
  expect(calendar).toBeVisible()
})

test('After click enter in number keypad, return json object', () => {
  const onFinish = jest.fn()
  const wrapper = render(createCategoryList(expenseTab))
  const icon = wrapper.getAllByTestId('cart-o')
  fireEvent.click(icon[1])
  const enter = wrapper.getByText('Enter')
  fireEvent.click(enter)
})
