import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectCount
} from '../../../store/counterSlice'

export default function OrderList() {
  const count = useSelector(selectCount)
  return (
    <div>
      <div>{count}</div>
    </div>
  )
}