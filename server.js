const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],  // Allow both origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Root Route
app.get("/", (req, res) => {
    res.send("Tea Factory Management System Backend");
});

// Import Routes
const employeeRoutes = require("./routes/employeeRoutes");
const qualityRoutes = require("./routes/qualityRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const systemUserRoutes = require("./routes/systemUser");

// Use Routes
app.use("/api/Employee", employeeRoutes);
app.use("/api/QualityChecks", qualityRoutes);
app.use("/api/Supplier", supplierRoutes);
app.use("/api/Inventory", inventoryRoutes);
app.use("/api/Sale", salesRoutes);
app.use("/api/Product", productRoutes);
app.use("/api/user", authRoutes);  // Add auth routes
app.use("/api/SystemUser", systemUserRoutes);

// Global Error Handler
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
