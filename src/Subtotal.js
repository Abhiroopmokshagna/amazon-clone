import React from 'react'
import { useStateValue } from './StateProvider'
import './Subtotal.css'
function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    return (
        <div className = "subtotal">
            <p>Subtotal ({basket?.length} items): <strong>$ {basket.reduce((total, item) => {
                return total + item.price;
            }, 0)}</strong></p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
            </small>
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
