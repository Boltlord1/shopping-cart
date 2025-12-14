import { useState } from 'react'
import { Outlet } from 'react-router'
import Dashboard from './Dashboard'
// import '../styles/index.css'

export default function App() {
    const [cart, setCart] = useState([])

    return (
        <>
        <Dashboard />
        <Outlet context={[cart, setCart]} />
        </>
    )
}