import React, { useContext } from 'react'
import Search from './Search'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
    const { currentUser } = useContext(AuthContext)
    

    return (
        <div className='navBox'>
            <div className='navBar p-4 col-12 d-flex align-items-center justify-content-center mt-0'>
                <span className='col-4 logo'>CHAT-APP</span>
                <div className='col-8 d-flex align-items-center justify-content-end'>
                    <img src={currentUser.photoURL} className='user border border-1' alt="" />
                    <span className='fs-6 m-2 fw-bold'>{currentUser.displayName}</span>
 
                    <button type="button" className="iconClass" tabIndex={-1} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                    </button>
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Are you sure?</h1>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button className='btn btn-dark' onClick={() => signOut(auth)}>
                                        Yes, Logout.
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Search />
        </div>

    )
}
