import Item from "./Item"
import test from '../test.json'

export default function Shop({ setCart }) {
    return (
        <main>
            <h1>Shop Page</h1>
            {test.map(data => (
                <Item key={data.id} data={data} />
            ))}
        </main>
    )
}