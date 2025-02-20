const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;

// Import Routes
const employeeRoutes = require('./routes/employeeRoutes');
const qualityRoutes = require('./routes/qualityRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // (Login and Registration)
const uploadRoutes = require('./routes/uploadRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');  // <-- New order routes

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Allow these origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(cookieParser));
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.api.ping()
    .then(() => {
        console.log("Cloudinary connection successful");
    })
    .catch(error => {
        console.error("Cloudinary connection failed:", error.message);
    });

// Root Route
app.get("/", (req, res) => {
    res.send("Tea Factory Management System Backend");
});

// Use Routes
app.use("/api/Employee", employeeRoutes);
app.use("/api/QualityChecks", qualityRoutes);
app.use("/api/Supplier", supplierRoutes);
app.use("/api/Inventory", inventoryRoutes);
app.use("/api/Sale", salesRoutes);
app.use("/api/Product", productRoutes);
app.use("/api/user", authRoutes);  // Login and Registration routes
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);  // <-- Order API is mounted here

// Global Error Handler
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
