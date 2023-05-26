import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function ChatInfo() {
    const { data } = useContext(UserContext)

    return (
        <div className='col-12'>
            <div className='bg-light p-2 border-bottom border-2 d-flex col-12'>
                <div className='col-10 m-2'>
                    <div className='rounded col-8 d-flex align-items-center p-4 pt-0 pb-0'>
                        <img src={data.user?.photoURL} className='chats col-3' alt="" />
                        <div className='row p-2 col-9'>
                            <span className='fs-5 fw-bold'>{data.user?.displayName}</span>
                        </div>
                    </div>
                </div>
                
                <div className='col-2 d-flex justify-content-evenly align-items-center'>
                    <button className='iconClass btn p-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                        </svg>
                    </button>
                    <button className='iconClass btn p-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.530 10.68 8.289 10 6 10c-2.29 0-3.530.68-4.308 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                    </button>
                    <button className='iconClass btn p-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}