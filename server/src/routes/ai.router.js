// const express = require("express");
import express from "express";
// const aiController = require("../controllers/ai.controller");
import aiController from "../controllers/ai.controller.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

// Correct spelling: "response", not "responce"
router.post("/get-response", authUser, aiController.getResponse);

export default router;
