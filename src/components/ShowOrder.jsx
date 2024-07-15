import axios from 'axios'
import React from 'react'
import { baseUrl } from '../config'
import { useParams } from 'react-router-dom'

export default function ShowOrder({ isLoggedIn }) {

    const { orderID } = useParams()

    const [order, setOrder] = React.useState(null)
    React.useEffect(() => {

        async function getOrder() {

            const orderToGet = await axios.get(`${baseUrl}/api/orders/${orderID}/`, {
                headers: {Authorization: `Bearer ${isLoggedIn}`}
            })
            setOrder(orderToGet.data)

        }
        getOrder()

    }, [])

    const orderedPizzas = order ? order.pizzas.map(pizza => pizza.toppings) : order

    const toppingNames = orderedPizzas && (
    
        orderedPizzas.map(pizza => (pizza.map(topping => topping.name)))
    
    )

    const timestamp = order ? (order.time_added.split(".")[0]).split("T") : order

    // console.log(timestamp)

    return (
        <div className='flex items-center w-dvw flex-col h-dvh'>

            <div className='bg-[#6b6b6d] bg-opacity-95 border-[3px] border-gray-800 rounded-xl pt-2 pb-8 px-8 flex flex-col'>
            
                <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl border-[3px] border-gray-400 md:text-[51px] pt-2 md:pt-0 md:pb-4 text-[28px]'>Order details</h1>

                <div className='w-full px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl border-[3px] border-gray-400 pt-2 mt-2 md:pt-1 md:pb-4'>

                    <p>Pizzas ordered:</p>
                    {toppingNames && toppingNames.map((toppingList, index) => <p key={index}>- {toppingList.join(", ")}</p>)}

                    {timestamp && <p className='mt-12'>Date ordered: {timestamp[0]}, at time {timestamp[1]}</p>}

                    {(order && order.notes) ? (

                        <p className='mt-8'>Additional notes: "{order.notes}"</p>

                    ) : (

                        <p className='mt-8'>No additional notes</p>

                    )}

                </div>
            
            </div>

        </div>
    )
}
