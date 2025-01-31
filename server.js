const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
const authRoutes = require("./routes/authRoutes"); // Import auth routes

// Use Routes
app.use("/api/Employee", employeeRoutes);
app.use("/api/QualityChecks", qualityRoutes);
app.use("/api/Supplier", supplierRoutes);
app.use("/api/Inventory", inventoryRoutes);
app.use("/api/Sale", salesRoutes);
app.use("/api/Product", productRoutes);
app.use("/api/auth", authRoutes); // Add auth routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});