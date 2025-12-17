import { useState, useEffect } from "react"
import { useOutletContext } from "react-router"
import cartStyles from '../styles/cart.module.css'
import shopStyles from '../styles/shop.module.css'

export default function Item({ data }) {
    const {cart, setCart} = useOutletContext()
    const [value, setValue] = useState(data.count)
    const [display, setDisplay] = useState(data.count.toString())
    const total = ((data.price * 100) * data.count).toString()

    function decrement() {
        if (value < 2) return
        setValue(value - 1)
        setDisplay((value - 1).toString())
    }
    function increment() {
        if (value > 49) return
        setValue(value + 1)
        setDisplay((value + 1).toString())
    }
    const manual = (e) => setDisplay(e.target.value)
    const submit = () => display < 1 || display > 50 ? setDisplay(value.toString()) : submitWithTrim()
    function submitWithTrim() {
        let char = 0
        while (display.charAt(char) === '0') {
            char++
        }
        const str = display.slice(char)
        setDisplay(str)
        setValue(Number(str))
    }

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
        <div className={shopStyles.item}>
            <img className={shopStyles.img} src={data.image} alt="" />
            <div className={shopStyles.details}>
                <h3 className={shopStyles.name}>{data.title}</h3>
                <p className={shopStyles.description}>{data.description}</p>
                <div className={shopStyles.info}>
                    <h4 className={shopStyles.rating}>Rating: {data.rating.rate} ({data.rating.count})</h4>
                    <h4 className={shopStyles.price}>${data.price}</h4>
                </div>
            </div>
            <div className={shopStyles.adjust}>
                <div className={cartStyles.quantity}>
                    <label htmlFor={`quantity-${data.id}`}>Quantity: </label>
                    <input type="number" name="count" id={`quantity-${data.id}`} min="1" max="50" value={display} onChange={manual} onBlur={submit} required />
                </div>
                <div className={cartStyles.buttons}>
                    <button onClick={decrement}>-</button>
                    <button onClick={increment}>+</button>
                    <button onClick={remove}>x</button>
                </div>
                <h4 className={cartStyles.subtotal}>Total: ${total.slice(0, -2) + '.' + total.slice(-2)}</h4>
            </div>
        </div>
    )
}