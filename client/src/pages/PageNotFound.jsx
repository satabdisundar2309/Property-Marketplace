import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='h-[80vh] w-full flex flex-col justify-center items-center'>
            <h1 className='text-9xl font-extrabold text-blue-700'>404</h1>
            <h1 className='text-4xl font-bold'>Page Not Found</h1>
            <NavLink className='w-[200px] bg-slate-900 text-white p-1 text-center mt-4 rounded-lg font-bold ' to='/'>Back To Home</NavLink>
        </div>
    )
}
