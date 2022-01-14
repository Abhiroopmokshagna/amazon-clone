import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import Header from './Header'
import './Payment.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './Reducer';
import NumberFormat from 'react-number-format';
import axios from './axios';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
function Payment() {
    const [{user, basket}, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    console.log("THE SECRET IS: ", clientSecret);

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async ({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            
            const userDocRef = doc(db, `users/${user?.uid}/orders/${paymentIntent.id}`);
            await setDoc(userDocRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',

            })

            navigate('/orders', {replace: true});
        })
    }

    const handleChange = event => {
        // listen for changes in CardElement
        // and display the errors as the customer types their card details

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <Header />
            <h1>Checkout (<Link to = "/checkout">{basket?.length} items</Link>)</h1>
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>31-63, Gundaiah thota</p>
                        <p>Chilakaluripet, 522616</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item) => {
                            return <CheckoutProduct
                                id = {item.id}
                                title = {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            />
                        })}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <NumberFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹ "}
                                />
                                <button disabled = {processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
