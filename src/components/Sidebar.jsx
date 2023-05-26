import React from 'react'
import Navbar from './Navbar'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar />
      <div className='inbox'>
        <Chats/>
      </div>
    </div>
  )
}
