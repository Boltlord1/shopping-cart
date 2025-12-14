import { useState } from "react"
import { useOutletContext } from "react-router"

export default function Item({ data }) {
    const [value, setValue] = useState(1)
    const [cart, setCart] = useOutletContext()

    const decrement = () => value > 1 ? setValue(value - 1) : setValue(1)
    const increment = () => value < 50 ? setValue(value + 1) : setValue(50)
    const manual = (e) => setValue(e.target.value)
    function addToCart(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const count = Number(formData.get('count'))
        let changed = false
        const array = []
        for (const item of cart) {
            if (item.id === data.id) {
                array.push({...data, count: item.count + count})
                changed = true
                continue
            }
            array.push(item)
        }
        if (changed) setCart(array)
        else setCart([...array, {...data, count: count}])
    }

    return (
        <div>
            <h2>{data.title}</h2>
            <h3>${data.price}</h3>
            <p>{data.description}</p>
            <h3>Rating: {data.rating.rate} ({data.rating.count})</h3>
            <form onSubmit={addToCart}>
                <button type="button" onClick={decrement}>-</button>
                <input type="number" name="count" min="1" max="50" value={value} onChange={manual} required />
                <button type="button" onClick={increment}>+</button>
                <button type="submit">Add to Cart</button>
            </form>
        </div>
    )
}