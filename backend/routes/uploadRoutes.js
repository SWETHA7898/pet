const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const BASE_URL = "https://your-backend.onrender.com"; // Change to your actual backend URL




// 🔹 Multer Storage for Image Uploads
const storage = multer.diskStorage({
    destination: "./upload/images", // Ensure the correct path
    filename: (req, file, cb) => {
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage:storage});
 


// 🔹 Upload Image API
router.post("/", upload.single("product"), (req, res) => {
    if (!req.file) return res.status(400).json({ success: 0, message: "No file uploaded" });

    res.json({
        success: 1,
        image_url: `${BASE_URL}/images/${req.file.filename}` // Updated for production
    });
});

module.exports = router;
