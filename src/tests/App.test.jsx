import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../components/App'
import Home from '../components/Home'
import Shop from '../components/Shop'
import Cart from '../components/Cart'
import { MemoryRouter, Routes, Route } from 'react-router'
import data from './data'

function Router() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/cart' element={<Cart />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}

beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve([ data ])
    }))
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('App component', () => {
    it('adds from shop to cart', async () => {
        render(<Router />)
        const shop = screen.getByRole('link', { name: 'Shop' })
        const cart = screen.getByRole('link', { name: 'Cart' })
        await userEvent.click(shop)
        const button = screen.getByRole('button', { name: 'Add to Cart' })
        await userEvent.click(button)
        await userEvent.click(button)
        await userEvent.click(cart)
        expect(screen.queryByRole('presentation')).not.toBeNull()
        expect(screen.queryByRole('spinbutton').value).toBe('2')
        expect(screen.queryByRole('button', { name: 'x' }).value).not.toBeNull()
    })
})