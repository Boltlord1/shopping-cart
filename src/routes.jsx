import App from "./components/App"
import Home from "./components/Home"
import Shop from "./components/Shop"
import Cart from "./components/Cart"

export default [
    {
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/shop', element: <Shop /> },
            { path: '/cart', element: <Cart /> }
        ]
    }
]