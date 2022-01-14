import './App.css';
import Home from './Home';
import Checkout from './Checkout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51KHhrJSB2tHC9gAj9PtW0xjeCFYSaP4vDfaENwmLflUfWCriNOhdL6hiGZ1bfMN8WT4kILqBeFxT8sBxBOYaIWMS00r0JvPHya');

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Will only run once when the app component loads.
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS: ", authUser);

      if (authUser) {
        // The user just logged in or the user was logged in.
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // The user is logged out.
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/checkout" element = {<Checkout />}/>
          <Route path = "/payment" element = {
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          }/>
          <Route path = "/orders" element = {<Orders />} />
          <Route path = "/" element = {<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
