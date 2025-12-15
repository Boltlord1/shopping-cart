import { useOutletContext } from "react-router"
import Item from './CartItem'
import styles from '../styles/cart.module.css'

export default function Cart() {
    const {cart, setCart} = useOutletContext()
    const total = cart.map(item => (item.price * 100) * item.count).reduce((tot, cur) => tot += cur, 0).toString()
    
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Cart page</h1>
            {cart.map(data => <Item key={data.id} data={data} />)}
            <h2 className={styles.total}>Total: ${total.slice(0, -2) + '.' + total.slice(-2)}</h2>
        </main>
    )
}