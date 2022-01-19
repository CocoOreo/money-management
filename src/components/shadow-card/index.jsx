import React from 'react'
import style from './style.module.scss'

export const ShadowCard = ({ width, height, children, radius }) => {
  width = typeof width === 'number' ? `${width}px` : width || '40px'
  height = typeof height === 'number' ? `${height}px` : height || '30px'
  radius = typeof radius === 'number' ? `${radius}px` : radius || '10px'
  return (
        <div className={style['shadow-card']} style={{ width: `${width}`, height: `${height}`, borderRadius: `${radius}` }}>
                {children}
        </div>
  )
}
