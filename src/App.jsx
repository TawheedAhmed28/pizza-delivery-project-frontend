import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import AllPizzas from "./components/AllPizzas"
import ShowPizza from "./components/ShowPizza"

import "./App.css"
import { ToastContainer, Flip } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NewPizza from "./components/NewPizza"
import EditPizza from "./components/EditPizza"
import MyOrders from "./components/MyOrders"
import NewOrder from "./components/NewOrder"
import ShowOrder from "./components/ShowOrder"

function App() {

    React.useEffect(() => {}, [])

    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'))
  
    const parts = isLoggedIn ? isLoggedIn.split('.') : null
    const payload = parts ? JSON.parse(atob(parts[1])) : null
    const userID = payload ? payload.sub : null

    return <>
        <Router>
            <div className="bg-auto bg-[url('https://img.freepik.com/premium-vector/pizza-ingredients-background-linear-graphic-tomato-garlic-basil-olive-pepper-mushroom-leaf-seamless-pattern_84749-2057.jpg')] h-dvh w-dvw bg-repeat">
                <NavBar 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                />

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                    draggable={false}
                    theme="dark"
                    transition={Flip}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/sign-in/" element={<SignIn />} />
                    <Route path="/auth/sign-up/" element={<SignUp />} />
                    <Route path="/pizzas/" element={<AllPizzas />} />
                    <Route path="/pizzas/new/" element={<NewPizza 
                        isLoggedIn={isLoggedIn}
                    />} />
                    <Route path="/pizzas/:pizzaID/" element={<ShowPizza 
                    isLoggedIn={isLoggedIn}
                    userID={userID}
                    />}/>
                    <Route path="/pizzas/:pizzaID/edit/" element={<EditPizza 
                    isLoggedIn={isLoggedIn}
                    />} />
                    <Route path="/orders/" element={<MyOrders 
                    isLoggedIn={isLoggedIn}
                    />} />
                    <Route path="/orders/new/" element={<NewOrder 
                    isLoggedIn={isLoggedIn}
                    />} />
                    <Route path="/orders/:orderID" element={<ShowOrder 
                    isLoggedIn={isLoggedIn}
                    />}/>
                </Routes>
            </div>
        </Router>
    </>
}

export default App
