import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import Header from './Header';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

function Checkout() {
    const [{user, basket}, dispatch] = useStateValue();
    return (
        <>
            <Header />
            <div className='checkout'>
                <div className="checkout__left">
                    <img className = 'checkout__ad' src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Laptops/LgGram/1500x300.jpg" alt="" />
                    <div>
                        <h3>Hello, {user?.email}</h3>
                        <h2 className="checkout__title">
                            Your Shopping Basket
                        </h2>
                        {basket.map(item => {
                            return <CheckoutProduct id = {item.id} title = {item.title} image = {item.image} price = {item.price} rating = {item.rating} />
                        })}
                    </div>
                </div>

                <div className="checkout__right">
                    <Subtotal />
                </div>
            </div>
        </>
    )
}

export default Checkout

