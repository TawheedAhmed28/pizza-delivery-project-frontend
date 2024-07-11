import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'


export default function NavBar({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"))
    }, [location])

    function logout() {
        localStorage.removeItem("token")
        navigate("/")
    }

    return <>
        <div className='flex justify-around w-full text-center py-4 bg-gradient-to-b from-70% from-gray-900 to-transparent pt-2 pb-8 px-3'>
            <Link to="/" className='underline'>Home</Link>
            {!isLoggedIn && <Link to="auth/sign-in/" className='underline'>Sign in</Link>}
            {!isLoggedIn && <Link to="auth/sign-up/" className='underline'>Sign up</Link>}
            <Link to="pizzas" className='underline'>Pizzas</Link>
            {isLoggedIn && <Link to="orders" className='underline'>Orders</Link>}
            {isLoggedIn && <button className='bg-transparent text-[#646cff] font-medium hover:text-[#535bf2] underline' onClick={logout}>Sign out</button>} 
        </div>
    </>
}
