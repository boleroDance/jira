import React, { useEffect, useState } from 'react'

export const Test = () => {

  const [num, setNum] = useState(0)

  const add = () => setNum(num + 1)

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log('num in interval', num)
  //   }, 1000)
  // }, [])

  useEffect(() => {
    return () => {
      console.log('组件卸载时，num为：', num)
    }
  }, [])

  return <div>
    <button onClick={add}>add</button>
    <p>number: {num}</p>
  </div>
}