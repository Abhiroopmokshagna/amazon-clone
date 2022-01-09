import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className='home'>
            <div className="home__container">
                <img src="https://m.media-amazon.com/images/I/617pSVtbf3L._SX3000_.jpg" alt="" className='home__image'/>

            </div>
            <div className="home__row">
                <Product 
                    id = '123456'
                    title = 'AS-IT-IS Nutrition Whey Protein Concentrate 80% Unflavoured, Labdoor Certified (1kg)' 
                    price = {19.99} 
                    image = 'https://m.media-amazon.com/images/I/514DjbvLP5L._AC_SY200_.jpg'
                    rating = {5}
                />
                <Product 
                    id = '234567'
                    title = '(Renewed) Mi Smart Band 5 – India’s No. 1 Fitness Band, 1.1-inch AMOLED Color Display, Magnetic Charging, 2 Weeks Battery Life, Personal Activity Intelligence (PAI), Women’s Health Tracking' 
                    price = {23.99} 
                    image = 'https://m.media-amazon.com/images/I/31x-J+tVmgS._AC_SY200_.jpg'
                    rating = {3}
                />
            </div>
            <div className="home__row">
                <Product 
                    id = '345678'
                    title = 'boAt Bassheads 100 in Ear Wired Earphones with Mic(Black)' 
                    price = {11.99} 
                    image = 'https://images-eu.ssl-images-amazon.com/images/I/31IdiM9ZM8L._AC_SX184_.jpg'
                    rating = {2}
                />
                <Product 
                    id = '345678'
                    title = 'Pigeon by Stovekraft Favourite Outer Lid Non Induction Aluminium Pressure Cooker, 3 Litres, Silver' 
                    price = {30.99} 
                    image = 'https://m.media-amazon.com/images/I/51xCU5ylKAL._AC_UL320_.jpg'
                    rating = {4}
                />
                <Product/>
            </div>
            <div className="home__row">
                <Product/>
            </div>
        </div>
    )
}

export default Home
