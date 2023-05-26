import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, serverTimestamp, getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async (e) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    )

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
    <div>
      <div className="d-flex search p-2" >
        <input value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} className="form-control me-2 p-2" type="search" placeholder="Search" aria-label="Search" />
      </div>
      {
        err &&
        <div className=" p-2 text-danger text-center mt-2" role="alert">
          No user found.
        </div>
      }

      {
        user &&
        <div className='col-12 bgcolor p-2 userChat' onClick={handleSelect}>
          <div id='singleChat' className='chatName bg-light rounded col-12 d-flex align-items-center p-4 pt-2 pb-2'>
            <img src={user.photoURL} className='chats col-3' alt="" />
            <div className='row p-2 col-9'>
              <span className='fs-5'>{user.displayName}</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}