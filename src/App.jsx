import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import SignIn from "./components/SignIn"

import "./App.css"

function App() {

    React.useEffect(() => {}, [])

    return <>
        <Router>
            <div className="bg-auto bg-[url('https://img.freepik.com/premium-vector/pizza-ingredients-background-linear-graphic-tomato-garlic-basil-olive-pepper-mushroom-leaf-seamless-pattern_84749-2057.jpg')] h-dvh w-dvw bg-repeat">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/sign-in/" element={<SignIn />}/>
                </Routes>
            </div>
        </Router>
    </>
}

export default App
