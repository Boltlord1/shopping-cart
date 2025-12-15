import { useState } from "react"
import { useOutletContext } from "react-router"
import Filter from "./Filter"
import Item from "./ShopItem"
import styles from '../styles/shop.module.css'

export default function Shop() {
    const {data} = useOutletContext()
    const [filters, setFilters] = useState([])
    const filtered = filters.length > 0 ? data.filter(item => filters.includes(item.category)) : data.toSpliced()
    function change(e) {
        if (e.target.checked) {
            setFilters([...filters, e.target.value])
        } else {
            const array = []
            for (const filter of filters) {
                if (filter === e.target.value) continue
                array.push(filter)
            }
            setFilters(array)
        }
    }

    return (
        <main className={styles.main}>
            <section className={styles.filters}>
                <div>
                    <Filter name="Men's clothing" id="men" change={change} />
                    <Filter name="Women's clothing" id="wmn" change={change} />
                    <Filter name="Jewelery" id="jwl" change={change} />
                    <Filter name="Electronics" id="elc" change={change} />
                </div>
            </section>
            <section className={styles.items}>
                <h1 className={styles.title}>Shop Page</h1>
                {filtered.map(data => <Item key={data.id} data={data} />)}
            </section>
        </main>
    )
}