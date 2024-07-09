import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import "./App.css"

function App() {

    React.useEffect(() => {}, [])

    return <> 
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    </>
}

export default App
