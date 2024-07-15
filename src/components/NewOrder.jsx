import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import { baseUrl } from '../config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function NewOrder({ isLoggedIn }) {

    const navigate = useNavigate()

    const [pizzas, setPizzas] = React.useState(null)
    const [formData, setFormData] = React.useState({

        pizzas: [],
        notes: ""

    })
    const [selectPizzas, setSelectPizzas] = React.useState(null)
    const [basketPizzas, setBasketPizzas] = React.useState([])

    React.useEffect(() => {

        !isLoggedIn && navigate('/auth/sign-in')

        async function getPizzas() {

            const pizzaData = await axios.get(`${baseUrl}/pizzas/`)
            setPizzas(pizzaData.data)

        }

        getPizzas()

    }, [])

    React.useEffect(() => {

        const formattedPizzas = pizzas ? (

            pizzas.map(pizza => {

                const pizzaToppings = pizza.toppings.map(topping => topping.name)

                return {
                    value: pizza.id,
                    label: pizzaToppings.join(", ")
                }

            })) : null

        setSelectPizzas(formattedPizzas)

    }, [pizzas])

    async function handleSubmit(event) {

        event.preventDefault()
        const newFormData = structuredClone(formData)

        const newFormDataPizzas = newFormData.pizzas.map(pizza => pizza.value)
        newFormData.pizzas = newFormDataPizzas

        try {

            await axios.post(`${baseUrl}/orders/`, newFormData, {
                headers: { Authorization: `Bearer ${isLoggedIn}` }
            })

            navigate('/orders/')
            
        } catch (error) {
            
            const errorArray = Object.entries(error.response.data)

            errorArray.forEach(field => {

                toast.error(`${field[0]}: ${field[1][0]}`, {})
            
            })

        }

    }

    function handlePizzaAdd(pizzas) {

        const newBasketPizzas = structuredClone(basketPizzas)
        newBasketPizzas.push(pizzas[0])
        pizzas.pop()
        setBasketPizzas(newBasketPizzas)

        const newFormData = structuredClone(formData)
        newFormData.pizzas = newBasketPizzas
        setFormData(newFormData)

    }

    function handlePizzaDelete() {

        const newBasketPizzas = structuredClone(basketPizzas)
        newBasketPizzas.pop()
        setBasketPizzas(newBasketPizzas)

        const newFormData = structuredClone(formData)
        newFormData.pizzas = newBasketPizzas
        setFormData(newFormData)

    }

    function handleTextChange(event) {

        const newFormData = structuredClone(formData)
        newFormData.notes = event.target.value
        setFormData(newFormData)

    }

    console.log(formData)

    return <div className='flex items-center w-dvw flex-col h-dvh'>

        <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Order pizzas</h1>
        <form onSubmit={handleSubmit} className='flex flex-col justify-around min-h-[60%] translate-y-6 bg-gray-500 bg-opacity-95 border-2 px-4 py-8 rounded-xl items-center w-full md:w-[40%]'>

            <div className='flex flex-row self-start justify-between w-full'>
                <label className='mr-2 self-center'>Pizzas: </label>

                <Select
                    options={selectPizzas}
                    isMulti
                    className='text-black max-w-[380px]'
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? "blue" : "black"
                        }),
                    }}
                    onChange={handlePizzaAdd}
                    value={null}
                />
            </div>
            <div className='flex flex-row self-start justify-between w-full'>

                {basketPizzas.length > 0 ? (
                    <>
                        <div className='flex flex-col h-fit items-start'>
                            <p className='max-w-full'>Pizzas selected: </p>
                            {basketPizzas.map((pizza, index) => <p key={index} className='max-w-full'>- {pizza.label}</p>)}
                        </div>
                    </>
                ) : (

                    <p>No pizzas selected.</p>

                )}

                <p className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold self-end cursor-pointer' onClick={handlePizzaDelete}>Remove last pizza</p>

            </div>

            <div className='flex flex-col self-start justify-between w-full'>

                <label className='mr-2 self-start'>Additional notes: </label>
                <textarea className='w-full p-1 rounded bg-[#131313]' onChange={handleTextChange} />
                

            </div>

            <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold'>Submit</button>

        </form>

    </div>
}
