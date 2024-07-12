import React from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import { baseUrl } from '../config'

export default function NewPizza({ isLoggedIn }) {

    const navigate = useNavigate()

    React.useEffect(() => {

        !isLoggedIn && navigate("/auth/sign-in/")

        getToppings()

    }, [])

    const [formData, setFormData] = React.useState({

        toppings: [],
        is_vegetarian: false,
        is_vegan: false

    })

    const [formToppings, setFormToppings] = React.useState(null)

    async function getToppings() {
        
        const { data } = await axios.get(`${baseUrl}/pizzas/toppings/`)
        const toppings = data.map(topping => {
            return {
                value: topping.id,
                label: topping.name
            }
        })

        setFormToppings(toppings)
    }

    formToppings && console.log(formToppings)

    function handleChange(event) {
        const newFormData = structuredClone(formData)
        console.log(event.target.value)
        newFormData[event.target.name] = event.target.value
        setFormData(newFormData)
    }

    function handleBoolChange(event) {
        const newFormData = structuredClone(formData)
        newFormData[event.target.name] = !newFormData[event.target.name]
        setFormData(newFormData)
    }
    
    console.log(formData)

    return (
        <div className='flex items-center w-dvw flex-col h-dvh'>

            <h1 className='w-fit px-6 pb-3 mt-2 bg-gray-900 bg-opacity-95 rounded-xl'>Add a pizza</h1>
            <form className='flex flex-col justify-around min-h-[60%] translate-y-6 bg-gray-500 bg-opacity-95 border-2 px-4 py-8 rounded-xl items-center w-fit'>

                <div className='flex flex-row self-start justify-between w-full'>
                    <label>Toppings: </label>
                    <input
                        type='text'
                        name='toppings'
                        onChange={handleChange}
                        value={formData.toppings}
                        className='bg-gray-900 py-0.5 px-1 rounded'
                    />
                </div>
                <div className='flex flex-row self-start justify-start w-full'>
                    <label className='mr-2'>Vegetarian? </label>
                    <input
                        type='checkbox'
                        name='is_vegetarian'
                        onChange={handleBoolChange}
                        value={formData.is_vegetarian}
                        className='bg-gray-900 size-[21px] rounded'
                    />
                </div>
                <div className='flex flex-row self-start justify-start w-full'>
                    <label className='mr-2'>Vegan? </label>
                    <input
                        type='checkbox'
                        name='is_vegan'
                        onChange={handleBoolChange}
                        value={formData.is_vegan}
                        className='bg-gray-900 rounded size-[21px]'
                    />
                </div>

            </form>

        </div>
    )
}
