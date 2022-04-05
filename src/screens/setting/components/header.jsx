/*
 * @Date: 2022-03-26 16:41:31
 * @LastEditors: Kunyang Xie
 * @LastEditTime: 2022-04-05 11:26:09
 * @FilePath: \money-management\src\screens\setting\components\header.jsx
 */
// import { ShadowCard } from 'components/shadow-card'
import React from 'react'
import style from './header.module.scss'
import { Image } from 'react-vant'
export const Header = () => {
  //   const src = 'https://img.yzcdn.cn/vant/cat.jpeg'
  return (
    <div>
      <div className={style.header} />
      <div className={style['info-wrapper']}>
        <div className={style['user-icon']}>
          <div className={style.icon}>
            <Image fit={'fill'} round src={require('./Kyrie.png')} />
          </div>
          <div
            className={style['user-name']}
            style={{
              fontSize: '22px',
              lineHeight: '70px',
              paddingLeft: '30px'
            }}>
            Kyrie
          </div>
        </div>
        <div className={style['record-wrapper']}>
          <div className={style['data-wrapper']}>
            <p>20</p>
            <p>Record Days</p>
          </div>
          <div className={style['data-wrapper']}>
            <p>34</p>
            <p>Recorded Number</p>
          </div>
        </div>
      </div>
    </div>
  )
}
