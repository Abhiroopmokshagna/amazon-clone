import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import './Subtotal.css'
import { getBasketTotal } from './Reducer';
import { default as NumberFormat } from 'react-number-format'
function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    const navigate = useNavigate();
    return (
        <div className = "subtotal">
            <p>Subtotal ({basket?.length} items): 
                <NumberFormat
                    renderText={(value) => <h3> {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹ "}
                />
            </p>
            <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
            </small>
            <button onClick = {e => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
