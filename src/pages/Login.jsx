import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        }
        catch (err) {
            setErr(true)
        }
    }
    return (
        <div style={{ height: "100vh" }} className='col-12 align-items-center d-flex justify-content-center'>
            <div className='p-md-5 d-flex row col-6 bgcolor rounded'>
                <form onSubmit={handleSubmit}>
                    <p className='fs-3 text-center mb-5 fw-bold'>User Login</p>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input required type="email" className="mb-2 form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input required type="password" id="inputPassword6" className="form-control" aria-labelledby="passwordHelpInline" />
                        </div>
                    </div>
                    <div className='col-12 d-flex justify-content-center row'>
                        <button style={{ borderRadius: "0" }} className='mt-5 btn btn-dark mt-3 col-6'>Login</button>
                        {
                            err &&
                            <div className=" p-2 text-danger text-center mt-2" role="alert">
                                Something went wrong!
                            </div>
                        }
                        <p className='mt-2 text-center'>Don't have an account? <Link className='fw-bold' to='/Register'>Sign up.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
