import React from 'react'
import NumberFormat from 'react-number-format';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        // remove the item from the basket.
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className='checkoutProduct'>
            <img className = 'checkoutProduct__image' src={image} alt="" />
            <div className="checkoutProduct__info">
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <NumberFormat
                        renderText={(value) => <strong> {value}</strong>}
                        decimalScale={2}
                        value={price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹ "}
                    />
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => {
                        return <p>⭐</p>

                    })}
                </div>
                {
                    !hideButton && <button onClick = {removeFromBasket}>Remove from Basket</button>
                }
            </div>
        </div>
    )
}

export default CheckoutProduct
