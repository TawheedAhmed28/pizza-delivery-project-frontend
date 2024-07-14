import React from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'
import { baseUrl } from '../config'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function EditPizza({ isLoggedIn }) {

    const [pizza, setPizza] = React.useState(null)
    const navigate = useNavigate()
    const { pizzaID } = useParams()

    React.useEffect(() => {

        !isLoggedIn && navigate("/auth/sign-in/")

        async function getPizza() {

            const data = await axios.get(`${baseUrl}/pizzas/${pizzaID}/`)
            setPizza(data.data)

        }

        getPizza()
        getToppings()

    }, [])

    React.useEffect(() => {

        getToppings()

    }, [pizza])

    const [formData, setFormData] = React.useState({

        toppings: [],
        is_vegetarian: false,
        is_vegan: false

    })

    const [formToppings, setFormToppings] = React.useState(null)

    async function getToppings() {

        const { data } = await axios.get(`${baseUrl}/pizzas/toppings/`)
        setFormData({...formData, is_vegetarian: pizza.is_vegetarian, is_vegan: pizza.is_vegan})

        const toppings = data.map(topping => {
            return {
                value: topping.id,
                label: topping.name
            }
        })
        
        setFormToppings(toppings)
    }

    function reformatToppings() {

        const toppings = formData.toppings.map(topping => {
            return topping.value
        })

        return (toppings)
    }

    function handleChange(toppings) {

        const newFormData = structuredClone(formData)
        newFormData.toppings = toppings

        setFormData(newFormData)

    }

    function handleBoolChange(event) {
        const newFormData = structuredClone(formData)
        newFormData[event.target.name] = !newFormData[event.target.name]
        setFormData(newFormData)
    }

    async function handleSubmit(event) {

        event.preventDefault()

        try {
            const newFormData = structuredClone(formData)
            newFormData.toppings = reformatToppings()

            await axios.put(`${baseUrl}/pizzas/${pizzaID}/`, newFormData, {
                headers: { Authorization: `Bearer ${isLoggedIn}` }
            })
            navigate(`/pizzas/${pizzaID}`)

        } catch (error) {

            console.log(error.response.data)
            const errorArray = Object.entries(error.response.data)

            errorArray.forEach(field => {

                toast.error(`${field[0]}: ${field[1][0]}`, {})

            })
        }

    }

    console.log(formData)

    return (
        <div className='flex items-center w-dvw flex-col h-dvh'>

            {(pizza) ? (

            <>
            <h1 className='w-fit px-6 pb-3 mt-2 bg-gray-900 bg-opacity-95 rounded-xl'>Edit pizza</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-around min-h-[60%] translate-y-6 bg-gray-500 bg-opacity-95 border-2 px-4 py-8 rounded-xl items-center w-fit'>
                <p>Current toppings: {(pizza.toppings.map(topping => topping.name)).join(", ")}</p>
                <div className='flex flex-row self-start justify-between w-full'>
                    <label className='mr-2 self-center'>Toppings: </label>

                    <Select
                        options={formToppings}
                        isMulti
                        className='text-black max-w-[380px]'
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? "blue" : "black"
                            }),
                        }}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-row self-start justify-start w-full'>
                    <label className='mr-2'>Vegetarian? </label>
                    <input
                        type='checkbox'
                        name='is_vegetarian'
                        onChange={handleBoolChange}
                        value={pizza.is_vegetarian}
                        className='bg-gray-900 size-[21px] rounded'
                        checked={formData.is_vegetarian}
                    />
                </div>
                <div className='flex flex-row self-start justify-start w-full'>
                    <label className='mr-2'>Vegan? </label>
                    <input
                        type='checkbox'
                        name='is_vegan'
                        onChange={handleBoolChange}
                        value={pizza.is_vegan}
                        className='bg-gray-900 rounded size-[21px]'
                        checked={formData.is_vegan}
                    />
                </div>

                <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold'>Submit</button>

            </form>
            </>

            ) : (
                <h1 className='w-fit px-6 pb-3 mt-2 bg-gray-900 bg-opacity-95 rounded-xl'>Loading pizza...</h1>
            )}

        </div>
    )
}
