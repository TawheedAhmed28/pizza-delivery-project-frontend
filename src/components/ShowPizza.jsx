import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../config'

export default function ShowPizza() {

    const { pizzaID } = useParams()

    const [pizza, setPizza] = React.useState(null)

    React.useEffect(() => {

        async function getPizza() {

            const data = await axios.get(`${baseUrl}/pizzas/${pizzaID}/`)
            setPizza(data.data)

        }
        getPizza()

    }, [])

    console.log(pizza)

    const toppingNames = pizza ? (pizza.toppings.map(topping => topping.name)) : pizza
    const lastTopping = toppingNames ? toppingNames.pop() : toppingNames

    // const vegetarian = pizza ? pizza.is_vegetarian : pizza
    // const vegan = pizza ? pizza.is_vegan : pizza

    return (

        <div className='flex items-center w-dvw flex-col h-dvh'>

            {pizza ? (

                <div className='bg-[#6b6b6d] bg-opacity-95 border-[3px] border-gray-800 rounded-xl pt-2 pb-8 px-8'>
                    <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl border-[3px] border-gray-400 md:text-[51px] pt-2 md:pt-0 md:pb-4 text-[28px]'>
                        {toppingNames.join(", ")} and {lastTopping} Pizza
                    </h1>

                    {pizza.is_vegetarian ? (
                        <p className='text-green-700 font-bold text-xl m-4'>Vegetarian</p>
                    ) : (
                        <p className='text-red-700 font-bold text-xl m-4'>Not vegetarian</p>
                    )}

                    {pizza.is_vegan ? (
                        <p className='text-green-700 font-bold text-xl m-4'>Vegan</p>
                    ) : (
                        <p className='text-red-700 font-bold text-xl m-4'>Not vegan</p>
                    )}

                    <p className='text-xl'>Toppings: {pizza.toppings.map(topping => topping.name).join(", ")}</p>
                    
                    <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold mt-6'>Add to order</button>
                </div>

            ) : (
                <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Loading pizza...</h1>
            )}

        </div>
    )
}
