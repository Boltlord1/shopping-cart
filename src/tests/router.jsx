import { useState } from 'react'
import { MemoryRouter, Outlet, Routes, Route } from 'react-router'

function Router({ Child, data }) {
    const [cart, setCart] = useState([ data ])
    return (
        <MemoryRouter>
            <Routes>
                <Route path='/' element={<Outlet context={{ cart, setCart }} />}>
                    {cart.map(item => <Route index element={<Child data={item} />} />)}
                </Route>
            </Routes>
        </MemoryRouter>
    )
}

export default Router
