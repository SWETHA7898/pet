const express = require("express");
const admin = require("firebase-admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        const { firebaseToken, username } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

        let existingUser = await User.findOne({ email: decodedToken.email });
        if (existingUser) return res.status(400).json({ success: false, error: "Email already exists." });

        let cart={};
        for(let i=0;i<300;i++){
            cart[i]=0
        }

        const user = new User({ name: username, email: decodedToken.email ,password:"",cart:cart});
        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error during signup." });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { firebaseToken } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        let user = await User.findOne({ email: decodedToken.email });

        if (!user) return res.status(401).json({ success: false, error: "User not found." });

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        res.json({ success: true, token });
        console.log(user)
        console.log(token)
    } catch (error) {
        res.status(401).json({ success: false, error: "Invalid Token" });
    }
});




router.post("/admin", async (req, res) => {
    try {
        const { email, pass } = req.body;
        console.log(email)
        console.log(pass)

        if (email === process.env.ADMINEMAIL && pass === process.env.ADMINPASS) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ success: true, token });
        }

        res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (err) {
        console.error("Admin login error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
module.exports = router;
