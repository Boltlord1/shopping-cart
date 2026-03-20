import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShopItem from '../components/ShopItem'
import Router from './router'
import data from './data'

describe('Home component', () => {
    it('quantity increments', async () => {
        render(<Router Child={ShopItem} data={data} />)
        const button = screen.getByRole('button', { name: '+' })
        await userEvent.click(button)
        const input = screen.getByRole('spinbutton')
        expect(input.value).toBe('2')
    })
})
