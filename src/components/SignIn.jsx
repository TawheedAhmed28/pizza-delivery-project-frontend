import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'
import { toast } from 'react-toastify'

export default function SignIn() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    function handleChange(event) {

        const newFormData = structuredClone(formData)
        newFormData[event.target.name] = event.target.value
        setFormData(newFormData)

    }

    console.log(formData)

    async function handleSubmit(event) {

        event.preventDefault()

        try {

            const { data } = await axios.post(`${baseUrl}/auth/sign-in/`, formData)
            const token = data.token

            console.log(data)
            localStorage.setItem("token", token)
            navigate("/")

        } catch (error) {

            toast.error(error.response.data.detail)

        }
    }

    return <div className='flex items-center w-dvw flex-col h-dvh'>
        <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Sign in!</h1>

        <form onSubmit={handleSubmit} className='flex flex-col justify-around min-h-[30%] translate-y-6 bg-gray-500 bg-opacity-95 border-2 px-4 py-8 rounded-xl items-center'>

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
                <label className='pr-2'>Password: </label>
                <input 
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                    className='bg-gray-900 py-0.5 px-1 rounded'
                />
            </div>
            <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold'>Sign in</button>


        </form>

    </div>
}
