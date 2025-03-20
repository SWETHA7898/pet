const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

// Use Upload Route


require("dotenv").config(); // Load environment variables

const serviceAccount = require("./config/firebase-admin.sdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'upload/images')));
app.use(cors({
  origin: ['https://pet-front-six.vercel.app', 'https://pet-admin-murex.vercel.app'], // Add all frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(() => console.log("❌ MongoDB Connection Failed"));

// Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/upload", uploadRoutes);

// Home Route
app.get("/", (req, res) => res.send("🚀 Express Server is Running"));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
