import { useState } from "react"
import { useOutletContext } from "react-router"
import styles from '../styles/shop.module.css'

export default function Item({ data }) {
    const {cart, setCart} = useOutletContext()
    const [value, setValue] = useState(1)

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
        <div className={styles.item}>
            <img className={styles.img} src={data.image} alt="" />
            <div className={styles.details}>
                <h3 className={styles.name}>{data.title}</h3>
                <p className={styles.description}>{data.description}</p>
                <div className={styles.info}>
                    <h4 className={styles.rating}>Rating: {data.rating.rate} ({data.rating.count})</h4>
                    <h4 className={styles.price}>${data.price}</h4>
                </div>
            </div>
            <form onSubmit={addToCart} className={styles.form}>
                <div className={styles.quantity}>
                    <button type="button" onClick={decrement}>-</button>
                    <input type="number" name="count" min="1" max="50" value={value} onChange={manual} required />
                    <button type="button" onClick={increment}>+</button>
                </div>
                <button type="submit" className={styles.submit}>Add to Cart</button>
            </form>
        </div>
    )
}