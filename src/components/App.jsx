import { Outlet } from 'react-router'
import Dashboard from './Dashboard'

export default function App() {

    return (
        <>
        <Dashboard />
        <Outlet />
        </>
    )
}