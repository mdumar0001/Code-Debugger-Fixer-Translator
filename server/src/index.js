// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const aiRoutes = require('./routes/ai');
// const historyRoutes = require('./routes/history');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/history', historyRoutes);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Import routes (add .js extension since ESM requires it)
import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import historyRoutes from "./routes/history.js";
import aiRroutes from "./routes/ai.router.js";
import translateroutes from "./routes/translate.js";
dotenv.config();

const app = express();
app.use(express.json());

// allow client dev origin
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
//  Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected yeah"))
  .catch((err) => console.error("MongoDB connection error:", err));

// import routes
// const authRoutes = require("./routes/auth");
// const aiRoutes = require("./routes/ai");
// const historyRoutes = require("./routes/history");

// Mount under /api so client can use REACT_APP_API_PREFIX=/api
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/history", historyRoutes);
app.use("/ai", aiRroutes);
// simple health check
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/translator", translateroutes);
// Generic error handler (must be added after routes)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // In production you might not want to send stack
  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// start server (existing code)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
