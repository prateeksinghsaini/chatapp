import React, { useContext, useEffect, useState } from 'react'
import Messege from './Messege'
import { UserContext } from '../context/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Messeges() {
  const [messeges, setMesseges] = useState([])
  const { data } = useContext(UserContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMesseges(doc.data().messeges)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  console.log(messeges)

  return (
    <div className='msgBox pt-4'>
      {
        messeges ? messeges.map((messege) => (
          <Messege messege={messege} key={messege.id} />
        )) : <div className='container d-flex justify-content-center align-items-center' style={{height:"100%", width: "100%"}}>
          <span className='bg-light p-4 rounded'>Start a chat with {data.user?.displayName}.</span>
        </div>
      }
    </div>
  )
}