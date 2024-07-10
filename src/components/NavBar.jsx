import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

    function logout() {
        localStorage.removeItem("token")
    }

    return <>
        <div className='flex justify-around w-full text-center py-4 bg-gradient-to-b from-70% from-gray-900 to-transparent pt-2 pb-8 px-3'>
            <Link to="/" className='underline'>Home</Link>
            <Link to="auth/sign-in/" className='underline'>Sign in</Link>
            <Link to="auth/sign-up/" className='underline'>Sign up</Link>
            <Link to="pizzas" className='underline'>Pizzas</Link> 
            <Link to="orders" className='underline'>Orders</Link>
            <button className='bg-transparent text-[#646cff] font-medium hover:text-[#535bf2] underline' onClick={logout}>Sign out</button> 
        </div>
    </>
}
