import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import { AuthContext } from '../context/AuthContext'

export default function Messege({ messege }) {
    const { data } = useContext(UserContext)
    const { currentUser } = useContext(AuthContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [messege])

    console.log(messege)

    return (
        <div ref={ref} className='p-4'>
            <div className={` ${messege.senderId === currentUser.uid ? "outgoing" : "incoming"} d-flex align-items-center p-4 pt-0 pb-0`}>
                <img src={
                    messege.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                } className='msgimg' alt="" />
                <div className={` ${messege.senderId === currentUser.uid ? "outgoingMsg" : "incomingMsg"} p-3 pt-1 pb-1 m-2 bg-light msg`}>
                    {
                        messege.img &&
                        <div className='rounded'>
                            <img className='chatImg rounded' src={messege.img} alt="" />
                        </div>
                    }
                    <span className='fs-5'>{messege.text}</span>
                    <span className='d-flex align-items-center justify-content-end' style={{ color: "gray", fontSize: "15px" }}>
                        {
                            console.log(new Date(messege.date.seconds%60))
                        }
                    </span>
                </div>
            </div>


            {/* <div className='d-flex incoming align-items-center p-4 pt-0 pb-0'>
                <img src="https://th.bing.com/th/id/R.5522155776f935b968ee033b378c7dce?rik=oHI71v3KwMtjtA&riu=http%3a%2f%2fwww.w3schools.com%2fhowto%2fimg_avatar2.png&ehk=v5Am%2bIj3lmC1HosplNbkqiz5jntcbPnbQ%2bvttJpmDHA%3d&risl=&pid=ImgRaw&r=0" className='msgimg' alt="" />
                <div className=' p-1 m-2 incomingMsg bg-light msg'>
                    <div className='rounded'>
                        <img className='chatImg rounded' src="https://c.pxhere.com/photos/b8/5a/cat_baby_cats-1210151.jpg!d" alt="" />
                    </div>
                    <span className=' p-1 d-flex align-items-center justify-content-end' style={{ color: "gray" }}>Just now</span>
                </div>
            </div>
            <div className='p-3 outgoing d-flex align-items-center justify-content-end'>
                <div className=' p-3 pt-1 pb-1 m-2 outgoingMsg msg'>
                    <span className='fs-5'>Hi, am good and you?</span>
                    <span className='d-flex align-items-center justify-content-start' style={{ color: "gray" }}>Just now</span>
                </div>
                <img src="https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" className='msgimg' alt="" />
            </div>
            <div className='p-3 outgoingImg d-flex align-items-center justify-content-end'>
                <div className=' p-1 m-2 outgoingMsg msg'>
                    <div className='rounded'>
                        <img className='chatImg rounded' src="https://th.bing.com/th/id/OIP.ZJOUSHF99nSg1V6JG_R9lAHaFj?pid=ImgDet&rs=1" alt="" />
                    </div>
                    <span className=' p-1 d-flex align-items-center justify-content-start' style={{ color: "gray" }}>Just now</span>
                </div>
                <img src="https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" className='msgimg' alt="" />
            </div> */}
        </div>
    )
}
