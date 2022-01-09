import './App.css';
import Home from './Home';
import Checkout from './Checkout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

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
          <Route path = "/" element = {<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
