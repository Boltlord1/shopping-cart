import { Link } from "react-router"

export default function Dashboard() {
    return (
        <header className="dashboard">
            <h1 className="title">Shopping Cart</h1>
            <nav className="links">
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/cart'>Cart</Link>
            </nav>
        </header>
    )
}