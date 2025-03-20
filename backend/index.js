const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
const mime = require("mime"); // Import mime for correct Content-Type handling

require("dotenv").config(); // Load environment variables

const serviceAccount = require("./config/firebase-admin.sdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 Serve Images Correctly
app.use("/images", (req, res, next) => {
    const filePath = path.join(__dirname, "upload/images", req.path);
    const mimeType = mime.getType(filePath);
    
    if (mimeType) {
        res.setHeader("Content-Type", mimeType); // Ensure correct image display
    }

    next();
});

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// 🔹 Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(() => console.log("❌ MongoDB Connection Failed"));

// 🔹 Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/upload", uploadRoutes); // Image upload route

// 🔹 Home Route
app.get("/", (req, res) => res.send("🚀 Express Server is Running"));

// 🔹 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
