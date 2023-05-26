import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'
import { db, storage } from '../firebase'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export default function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(UserContext)

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messeges: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          })
        });
      }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messeges: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessege"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessege"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='inputBox  d-flex p-2 align-items-center'>
      <input onChange={e => setText(e.target.value)} value={text} type='text' className='fs-5 col-9 rounded border-0 p-3' placeholder='Type a message...' />
      <div className='p-2 col-3 d-flex justify-content-evenly align-items-center'>
        <div className='d-flex justify-content-center' style={{ cursor: "pointer" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-paperclip iconClass" viewBox="0 0 16 16">
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
          </svg>
          <input onChange={e => setImg(e.target.files[0])} type='file' style={{ display: "none" }} id='file'></input>
          <label htmlFor="file">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-images iconClass" viewBox="0 0 16 16">
              <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
            </svg>
          </label>
        </div>
        <button onClick={handleSend} className='btn btn-light border p-5 pt-2 pb-2'>Send</button>
      </div>
    </div>
  )
}
