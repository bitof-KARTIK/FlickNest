import React from 'react'
import notfound from "/notfound.gif"

const Notfound = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-black'>
            <img className='h-[50%] object-contain' src={notfound} alt="" />
        </div>
    )
}

export default Notfound