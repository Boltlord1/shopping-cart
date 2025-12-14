import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import Dashboard from './Dashboard'
// import '../styles/index.css'

export default function App() {
    const [cart, setCart] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        async function getProducts() {
            const response = await fetch('https://fakestoreapi.com/products')
            const json = await response.json()
            setData(json)
        }
        getProducts()
    }, [])

    return (
        <>
        <Dashboard />
        <Outlet context={{ cart, setCart, data }} />
        </>
    )
}