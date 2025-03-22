const express = require("express");
const { fetchUser } = require("../middleware/authMiddleware");
const User = require("../models/User");


const router = express.Router();

//  Add to Cart
router.post("/add", fetchUser, async (req, res) => {
    const { itemId } = req.body;

    console.log("User:", req.user); 
    console.log("Received Item ID:", itemId); 
    let userdata=await User.findOne({_id:req.user.id})

    userdata.cart[itemId] = (userdata.cart[itemId] || 0) + 1;

    await User.findOneAndUpdate({_id:req.user.id},{cart:userdata.cart})
   
    


    
    res.status(200).send({ success: true, message: "Item added to cart", itemId ,});

   
});

//  Remove from Cart
router.post("/remove", fetchUser, async (req, res) => {
    const { itemId } = req.body;
    console.log("User:", req.user); 
    console.log("Received Item ID:", itemId); 
    let userdata=await User.findOne({_id:req.user.id})
    console.log(userdata.cart)


    if(userdata.cart[itemId]>0){
        userdata.cart[itemId]-=1

    }
    
    await User.findOneAndUpdate({_id:req.user.id},{cart:userdata.cart})
   

   
});

//  Get Cart
router.post("/get", fetchUser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        res.json(user.cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
