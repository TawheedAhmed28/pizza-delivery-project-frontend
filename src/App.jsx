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

function App() {

    React.useEffect(() => {}, [])

    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'))
    console.log(isLoggedIn)

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
                    <Route path="/pizzas/:pizzaID" element={<ShowPizza />}/>
                </Routes>
            </div>
        </Router>
    </>
}

export default App
