import React from 'react'
import ChatInfo from './ChatInfo'
import Messeges from './Messeges'
import Input from './Input'

export default function Chat() {
  return (
    <div className='chat'>
      <ChatInfo />
      <Messeges />
      <Input />
    </div>
  )
}
