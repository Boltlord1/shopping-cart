import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../components/CartItem'
import Router from './router'
import item from './data'
const data = { ...item, count: 5 }

describe('Cart Item component', () => {

    it('button removes item from cart and screen', async () => {
        const router = render(<Router data={data} Child={CartItem} />)
        const button = screen.getByRole('button', { name: 'x' })
        await userEvent.click(button)
        expect(screen.queryByRole('button')).toBe(null)
    })

    it('button increments item count', async () => {
        const router = render(<Router data={data} Child={CartItem} />)
        const button = screen.getByRole('button', { name: '+' })
        await userEvent.click(button)
        expect(screen.getByRole('spinbutton').value).toBe('6')
    })

    it('changing quantity manually works for a number between 1 and 50', async () => {
        const router = render(<Router data={data} Child={CartItem} />)
        const input = screen.getByLabelText('Quantity:')
        await userEvent.type(input, '[backspace]40[tab]')
        expect(input.value).toBe('40')
    })

    it('changing quantity to 60 changes it back the previous value of 5', async () => {
        const router = render(<Router data={data} Child={CartItem} />)
        const input = screen.getByLabelText('Quantity:')
        await userEvent.type(input, '[backspace]60[tab]')
        expect(input.value).toBe('5')
    })
})
