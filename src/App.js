import './App.css';
import Home from './Home';
import Checkout from './Checkout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
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
