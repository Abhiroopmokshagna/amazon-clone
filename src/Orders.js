import React, { useEffect, useState } from 'react'
import './Orders.css';
import { db } from './firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { useStateValue } from './StateProvider';
import Order from './Order';
import Header from './Header';

function Orders() {
    const [{user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            const results = query(collection(db, `users/${user?.uid}/orders`), orderBy('created', 'desc'))
            onSnapshot(results, (querySnapshot) => {
                setOrders(querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        data: doc.data()
                    }
                }))
            })

        } else {
            setOrders([])
        }
    }, [user])

    return (
        <>
            <Header />
            <div className='orders'>
                <h1>Your Orders</h1>
                <div className="orders__order">
                    {orders?.map((order) => {
                        return <Order order = {order} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Orders
