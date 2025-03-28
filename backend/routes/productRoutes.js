const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


router.get("/", async (req, res) => {
    let products = await Product.find({});
    res.json(products);
});

router.post("/add", async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({ id, ...req.body });
        await product.save();
        res.json({ success: true, name: req.body.name,image:req.body.image });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({ success: 1, deletedProduct: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/bestsellers", async (req, res) => {
    try {
        let bestsellers = await Product.find({ bestseller: true })
            .sort({ date: -1 }) 
            .limit(8); 
        res.send(bestsellers);
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch bestsellers" });
    }
});



router.get("/popular", async (req, res) => {
    try {
        let products = await Product.find({ category: "dog" });
        res.send(products.slice(0, 4));
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch popular dog products" });
    }
});








module.exports = router;
