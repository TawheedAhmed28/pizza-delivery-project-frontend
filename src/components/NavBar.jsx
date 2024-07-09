import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return <>
        <div className='flex justify-around w-full text-center py-4 bg-gradient-to-b from-70% from-gray-900 to-transparent pt-2 pb-8 px-3'>
            <Link to="/">Home</Link>
            <Link to="auth/sign-in/">Sign in</Link>
            <Link to="auth/sign-up/">Sign up</Link>
            <Link to="pizzas">Pizzas</Link> 
            <Link to="orders">Orders</Link> 
        </div>
    </>
}
