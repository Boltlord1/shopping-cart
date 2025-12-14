import { useState } from "react"
import { useOutletContext } from "react-router"
import Filter from "./Filter"
import Item from "./ShopItem"

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
        <main>
            <section>
                <Filter name="men's clothing" id="men" change={change} />
                <Filter name="jewelery" id="jwl" change={change} />
                <Filter name="electronics" id="elc" change={change} />
                <Filter name="women's clothing" id="wmn" change={change} />
            </section>
            <section>
                <h1>Shop Page</h1>
                {filtered.map(data => <Item key={data.id} data={data} />)}
            </section>
        </main>
    )
}