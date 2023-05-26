import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })

                        setDoc(doc(db, "userChats", res.user.uid), {})
                        navigate("/")
                    } catch (error) {
                        setErr(true)
                    }
                });
            }
            );
        } catch (err) {
            setErr(true)
            console.log(err)
        }


    }

    return (
        <div style={{ height: "100vh" }} className='col-12 align-items-center d-flex justify-content-center'>
            <div className='p-md-5 d-flex row col-6 bgcolor rounded'>
                <form onSubmit={handleSubmit}>
                    <p className='fs-3 text-center mb-5 fw-bold'>Register New User</p>
                    <div>
                        <p>Username</p>
                        <div className="input-group mb-3">
                            <input required type="text" className="mb-2 form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input required type="email" className="mb-2 form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input minLength={6} maxLength={20} required type="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Must be 6-20 characters long.
                            </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                    </div>
                    <div className='col-12 d-flex justify-content-center row'>
                        <button style={{ borderRadius: "0" }} className='mt-5 btn btn-dark mt-3 col-6'>Sign up</button>
                        {
                            err &&
                            <div className=" p-2 text-danger text-center mt-2" role="alert">
                                Something went wrong!
                            </div>
                        }
                        <p className='mt-2 text-center'>Already have an account? <Link className='fw-bold' to='/Login'>Login.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
