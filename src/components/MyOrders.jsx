import React from 'react'
import axios from 'axios'
import { baseUrl } from '../config'
import { Link } from 'react-router-dom'

export default function MyOrders({ isLoggedIn }) {

    const [orders, setOrders] = React.useState(null)

    React.useEffect(() => {

        async function fetchOrders() {
            const allOrders = await axios.get(`${baseUrl}/orders/`, {
                headers: {Authorization: `Bearer ${isLoggedIn}`}
            })
            setOrders(allOrders.data)
        }

        fetchOrders()
    }, [])

    console.log(orders)

    function formatDate(date) {

        const datetime = date.split(".")[0]

        const yearmonthday = datetime.split("T")[0]
        const timestamp = datetime.split("T")[1]

        return `${yearmonthday}, ${timestamp}`

    }

  return (
    <div className='flex items-center w-dvw flex-col h-dvh'>

        <h1 className='w-fit px-6 pb-3 bg-gray-900 bg-opacity-95 rounded-xl'>My orders</h1>
        
        <div className='flex flex-col items-left mt-[4%] min-h-[70%] w-fit max-h-fit bg-gray-700 bg-opacity-95 p-8 border-[3px] border-black rounded-xl'>

            {orders && orders.map((order, index) => {
                return <div key={index} className='bg-gray-900 rounded-xl flex-row flex items-center justify-between my-1 border border-gray-400 py-1 pl-4 pr-6'>

                    <p className='text-sm pr-12 md:text-xl md:pr-32'>Ordered at {formatDate(order.time_added)} - {order.pizzas.length} {order.pizzas.length === 1 ? "pizza" : "pizzas"}</p>
                    <Link to={`/orders/${order.id}/`} className='underline text-sm'>Order details</Link>

                </div>
            })}

        </div>

        <Link className='bg-[#19191a] px-6 py-2 rounded-lg border-2 border-black hover:bg-[#b4b4b5] hover:border-black hover:text-black hover:font-bold text-white text-2xl' to={"/orders/new/"}>Make an order</Link>
    
    </div>
  )
}
