import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { Tabbar, Icon } from 'react-vant'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { recordSlice } from 'store/slices/recordSlice'
export const Footer = ({ tabs, ...rest }) => {
  // redux
  const dispatch = useDispatch()
  // url
  const location = useLocation()
  const navigate = useNavigate()
  // because of the plus button, there will be five elements in the bar
  // so the values of four tabs will be 0 1 3 4
  const getPathIndex = () => {
    return tabs.findIndex((item) => item.path === location.pathname) > 1
      ? tabs.findIndex((item) => item.path === location.pathname) + 1
      : tabs.findIndex((item) => item.path === location.pathname)
  }
  // Listen to the change of location
  useEffect(
    () => {
      setCurrent(getPathIndex())
    },
    [location]
  )
  const index = getPathIndex()
  const [current, setCurrent] = useState(index)
  //   The number of tabs can only be four, and it will be divided into two parts, left and right
  const left = tabs.slice(0, 2)
  const right = tabs.slice(2, 4)
  const onChange = (value) => {
    const path = value > 1 ? tabs[value - 1].path : tabs[value].path
    navigate(path)
    setCurrent(value)
  }
  const onClick = () => {
    dispatch(recordSlice.actions.setShowAddModal(true))
  }
  return (
    <div className={style.footer}>
      <Tabbar value={current} onChange={onChange}>
        {left.map((tab, index) => {
          return (
            <Tabbar.Item icon={tab.icon} key={index}>
              <span>{tab.content}</span>
            </Tabbar.Item>
          )
        })}
        <div className={style['button-wrapper']} onClick={() => onClick()}>
          <div className={style['circle-border']} />
          <div className={style.button}>
            <Icon name="plus" />
          </div>
        </div>
        {right.map((tab, index) => {
          return (
            <Tabbar.Item icon={tab.icon} key={index}>
              <span>{tab.content}</span>
            </Tabbar.Item>
          )
        })}
      </Tabbar>
    </div>
  )
}
