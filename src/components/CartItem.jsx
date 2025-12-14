import { useState, useEffect } from "react"
import { useOutletContext } from "react-router"

export default function Item({ data }) {
    const [cart, setCart] = useOutletContext()
    const [value, setValue] = useState(data.count)
    const [display, setDisplay] = useState(data.count)
    const total = ((data.price * 100) * data.count).toString()

    function decrement() {
        if (value < 1) return
        setValue(value - 1)
        setDisplay(value - 1)
    }
    function increment() {
        if (value > 49) return
        setValue(value + 1)
        setDisplay(value + 1)
    }
    const manual = (e) => setDisplay(Number(e.target.value))
    const submit = () => display > 0 && display < 51 ? setValue(display) : setDisplay(value)

    useEffect(() => {
        const array = []
        for (const item of cart) {
            if (item.id === data.id) {
                array.push({...data, count: value})
                continue
            }
            array.push(item)
        }
        setCart(array)
    }, [value])

    const remove = () => setCart(cart.filter(item => item.id !== data.id))

    return (
        <div>
            <h2>{data.title} <button onClick={remove}>Remove</button></h2>
            <h3>Price: ${data.price}</h3>
            <h3>Amount: {data.count}</h3>
            <h3>Total: ${total.slice(0, -2) + '.' + total.slice(-2)}</h3>
            <p>{data.description}</p>
            <h3>Rating: {data.rating.rate} ({data.rating.count})</h3>
            <button type="button" onClick={decrement}>-</button>
            <input type="number" name="count" min="1" max="50" value={display} onChange={manual} onBlur={submit} required />
            <button type="button" onClick={increment}>+</button>
        </div>
    )
}