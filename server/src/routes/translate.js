// const express = require("express");
// const router = express.Router();
// const historyController = require("../controllers/historyController");
// const authMiddleware = require("../middleware/auth");

// // Route to get user history
// router.get("/", authMiddleware, historyController.getUserHistory);

// // Route to add a new history entry
// router.post("/", authMiddleware, historyController.addHistoryEntry);

// // Route to delete a history entry
// router.delete("/:id", authMiddleware, historyController.deleteHistoryEntry);

// // module.exports = router;
// export default router;
// import express from "express";
// import {
//   getUserHistory,
//   addHistoryEntry,
//   deleteHistoryEntry,
// } from "../controllers/historyController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// // Route to get user history
// router.get("/", authMiddleware, getUserHistory);

// // Route to add a new history entry
// router.post("/", authMiddleware, addHistoryEntry);

// // Route to delete a history entry
// router.delete("/:id", authMiddleware, deleteHistoryEntry);

// export default router;
import express from "express";
// import {
//   getPasHistory,
//   // updateHistory,
//   deleteHistoryItem,
// } from "../controllers/historyController.js";
import {
  getPasHistory,
  deleteHistoryItem,
} from "../controllers/translateHistoryController.js";
import authUser from "../middleware/authUser.js"; // <-- default import

const router = express.Router();

// Route to get user history
router.get("/history", authUser, getPasHistory);

// Route to add a new history entry
// router.post("/update-history", authUser, updateHistory);

// Route to delete a history entry
// router.delete("/delete-histories/:id", authUser, deleteHistoryItem);
router.delete("/history/:id", authUser, deleteHistoryItem);
// /api/translator/history/${id}
export default router;
