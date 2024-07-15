import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../config"
import {  toast } from "react-toastify"

export default function SignUp() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: ""
    })

    function handleChange(event) {
        
        const newFormData = structuredClone(formData)
        newFormData[event.target.name] = event.target.value
        setFormData(newFormData)
    
    }

    async function handleSubmit(event) {
    
        event.preventDefault()
        try {

            await axios.post(`${baseUrl}/api/auth/sign-up/`, formData)
            navigate(`${baseUrl}/api/auth/login`)

        } catch (error) {
            
            const errorArray = Object.entries(error.response.data)

            errorArray.forEach(field => {

                toast.error(`${field[0]}: ${field[1][0]}`, {})
            
            })

        }

    }

return <div className="flex items-center w-dvw flex-col h-dvh">

    <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Sign up!</h1>
    
    <form onSubmit={handleSubmit} className='flex flex-col justify-around min-h-[60%] translate-y-6 bg-gray-500 bg-opacity-95 border-2 px-4 py-8 rounded-xl items-center w-fit'>

        <div className='flex flex-row self-start justify-between w-full'>
            <label>Username: </label>
            <input 
                type='text'
                name='username'
                onChange={handleChange}
                value={formData.username}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <div className='flex flex-row self-start w-full justify-between'>
            <label>Password: </label>
            <input 
                type='password'
                name='password'
                onChange={handleChange}
                value={formData.password}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <div className='flex flex-row self-start w-full justify-between'>
            <label className="pr-2">Confirm password: </label>
            <input 
                type='password'
                name='password_confirmation'
                onChange={handleChange}
                value={formData.password_confirmation}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <div className='flex flex-row self-start w-full justify-between'>
            <label>Email: </label>
            <input 
                type='text'
                name='email'
                onChange={handleChange}
                value={formData.email}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <div className='flex flex-row self-start w-full justify-between'>
            <label>First name: </label>
            <input 
                type='text'
                name='first_name'
                onChange={handleChange}
                value={formData.first_name}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <div className='flex flex-row self-start w-full justify-between'>
            <label>Last name: </label>
            <input 
                type='text'
                name='last_name'
                onChange={handleChange}
                value={formData.last_name}
                className='bg-gray-900 py-0.5 px-1 rounded'
            />
        </div>
        <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold'>Sign up</button>

    </form>

</div>

}