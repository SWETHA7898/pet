const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { fetchUser } = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const User = require("../models/User");
const mongoose = require("mongoose");


const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_SmT3UOUcpyxz3T",
    key_secret: "vxbMnba1bZArbXRG9k46q6GO"
});


router.post("/placeorder", fetchUser, async (req, res) => {
    try {
        const { items, amount, address, phone, firstName, lastName } = req.body;
        const finalAmount = amount * 100;

        console.log(req.user.id)

        try {

            const order = await razorpayInstance.orders.create({
                amount: finalAmount,
                currency: "INR",
                receipt: crypto.randomBytes(10).toString("hex")
            });
            res.status(200).json({ success: true, order });
        }
        catch (razorpayError) {
            console.error("Error creating Razorpay order:", razorpayError);
            return res.status(500).json({ success: false, message: "Failed to create payment order" });
        }
     
        const newOrder = new Order({
            userId: req.user.id,
            items,
            amount,
            address,
            phone,
            firstName,
            lastName,
        });

        await newOrder.save();
        await User.findOneAndUpdate({ _id: req.user.id }, { cart: {} })







        console.log(req.user.id.toString())
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


router.post("/verify", fetchUser, async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const secret = "vxbMnba1bZArbXRG9k46q6GO";

    const expectedSign = crypto
        .createHmac("sha256", secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");
    try {
        if (expectedSign === razorpay_signature) {
            res.status(200).json({ success: true, message: "Payment verified successfully" });
            const updatedOrder = await Order.findOneAndUpdate(
                { userId: req.user.id }, 
                { $set: { payment: true } }, 
                { sort: { date: -1 }, new: true } 
            );
            
            if (updatedOrder) {
                console.log("Updated Order:", updatedOrder);
            } else {
                console.log("No orders found for this user.");
            }
            
            
        
           






        }

        else {
            res.status(400).json({ success: false, message: "Invalid signature" });
            await Order.findOneAndDelete({ userId: req.user.Id })
        }
    }
    catch (error) {
        console.log("error")
        res.json({ success: false, error })
    }



});


router.post("/userorder", fetchUser, async (req, res) => {
    try {
        console.log("User from token:", req.user);

        const orders = await Order.find({ userId: req.user.id });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


router.get("/listorder", async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


router.post("/update", async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    }
    catch (error) {
        res.json({ success: false, message: "Status failed" })
    }

})




module.exports = router;
