const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51KHhrJSB2tHC9gAjt9tG9BISxL8ZpHLyFWricrDdbKgbVu0leXsAwrWcPMROfHbUbh4kWRQ2ai3mYeASq6HaFmDm00Ly4ltAXS');

// App config
const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// API routes
app.get("/", (req, res) => {
    res.status(200).send('Hello world');
})

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;
    console.log('Payment request recieved.', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
        description: "some description",
        
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });

})

// Listen command
exports.api = functions.https.onRequest(app);