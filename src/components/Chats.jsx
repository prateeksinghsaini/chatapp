import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export default function Chats() {
  const [chats, setChats] = useState([])
  
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(UserContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (user, index) => {
    // console.log(user.uid);
    let id = "user_" + index;
    // alert(id)
    document.querySelector(".singleChat").classList.remove("clicked");
    document.querySelector("#"+id).classList.add("clicked");
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  return (
    <>
      <ul className='list-group'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, index) => (
          <li key={index} onClick={() => handleSelect(chat[1].userInfo, index)} >
            <div className='col-12'>
              <div className='m-2'>
                <div className='chatName singleChat rounded col-12 d-flex align-items-center p-4 pt-1 pb-1' id={`user_${index}`}>
                  <img src={chat[1].userInfo.photoURL} className='chats col-3' alt="" />
                  <div className='row p-2 col-9'>
                    <span className='fs-4 m-2'>{chat[1].userInfo.displayName}</span>
                    <span className='fs-6'>{chat[1].lastMessege?.text}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}