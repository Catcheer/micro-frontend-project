import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  selectCount,incremented, decremented 
} from '../../../store/counterSlice'


export default function ProductImageManage() {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const count = useSelector(selectCount)
  console.log('cout======',count)
  return (
    <div>
      <h1>reactRedux </h1>
      <div>{count}</div>
      <Button onClick={()=>{dispatch(incremented())}}>+</Button>
      <Button onClick={()=>dispatch(decremented())}>-</Button>
      <div>
        <Button type="primary"  onClick={()=>{
          navigator('/orderList')
        }}>to 订单列表</Button>
      </div>
    </div>
  )
}