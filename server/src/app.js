const express = require("express");
const aiRoutes = require("./routes/ai.router");
const cors = require("cors");

const app = express();

app.use(cors());

// if use the req.body then use this middleware
app.use(express.json());

app.use("/ai", aiRoutes);

module.exports = app;
