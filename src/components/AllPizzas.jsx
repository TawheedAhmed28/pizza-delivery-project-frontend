import React from 'react'
import axios from 'axios'
import { baseUrl } from '../config'
import { Link } from 'react-router-dom'

export default function AllPizzas() {

    const [pizzas, setPizzas] = React.useState(null)

    React.useEffect(() => {

        async function fetchPizzas() {
            const allPizzas = await axios.get(`${baseUrl}/pizzas/`)
            setPizzas(allPizzas.data)
        }

        fetchPizzas()
    }, [])

    return (
        <div className='flex items-center w-dvw flex-col h-dvh'>

            {pizzas ? (

                <>

                    <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Pizzas</h1>
                    <div className='flex flex-col items-left mt-[4%] h-[60%] w-fit max-h-fit bg-gray-700 bg-opacity-95 p-8 border-[3px] border-black rounded-xl'>

                        {pizzas.map((pizza, index) => {

                            const toppingNames = pizza.toppings.map(topping => topping.name)

                            return <div key={index} className='bg-gray-900 rounded-xl flex-row flex items-center justify-between my-1 border border-gray-400 py-1 pl-4 pr-6'>
                                <h1 className='pb-2 pr-32 text-4xl'>{toppingNames.join(", ")}</h1>
                                <Link className='underline' to={`/pizzas/${pizza.id}`}>View Pizza</Link>
                            </div>
                        })}
                    </div>

                </>

            ) : (

                <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>Loading pizzas...</h1>

            )}


            <button className='bg-[#19191a] px-3 py-1 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold' onClick={() => { console.log(pizzas) }}>Log</button>

        </div>
    )
}
