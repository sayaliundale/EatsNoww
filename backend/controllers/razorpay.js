const Razorpay = require("razorpay");
require("dotenv").config();
const express = require('express');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

const create_payment = async (req, res) => {
    const { amt } = req.body;
    try{
        const order = await razorpay.orders.create({
            amount : amt,
            currency: "INR"
        });
        res.json(order);
    } catch(err){
        res.status(500).json({error : err.message});
    }

};

module.exports = create_payment;

