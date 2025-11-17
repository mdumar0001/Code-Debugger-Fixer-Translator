// // Get user history
// export const getUserHistory = async (req, res) => {
//   try {
//     const history = await History.find({ userId: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(history);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Add to user history
// export const addHistoryEntry = async (req, res) => {
//   const { code, action } = req.body;

//   if (!code || !action) {
//     return res.status(400).json({ message: "Code and action are required" });
//   }

//   try {
//     const newHistory = new History({
//       userId: req.user.id,
//       code,
//       action,
//       createdAt: new Date(),
//     });

//     await newHistory.save();
//     res.status(201).json(newHistory);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Clear user history
// export const deleteHistoryEntry = async (req, res) => {
//   try {
//     await History.deleteMany({ userId: req.user.id });
//     res.status(200).json({ message: "History cleared" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// const Review = require("../models/Review");
// const axios = require("axios");

// Helper: mock or make real AI call

import History from "../models/History.js";

const getPasHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const docs = await History.find({ userId }).sort({ createdAt: -1 }).lean();
    // return minimal fields for sidebar
    const list = docs.map((d) => ({
      id: d._id,
      title: d.title || d.code.slice(0, 40),
      code: d.code,
      // reviewText: d.reviewText,
      debuggedCode: d.debuggedCode,
      createdAt: d.createdAt,
    }));
    // return res.json(list);
    console.log("History List:", list.length);
    return res.json({ success: "true", list });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// const updateHistory = async (req, res) => {
//   try {

//     const userId = req.user.id;
//     const { id } = req.params;
//     const { code, review } = req.body;
//     const doc = await History.findOneAndUpdate(
//       { _id: id, userId },
//       {
//         code,
//         reviewText: review,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     );
//     if (!doc) return res.status(404).json({ error: "Not found" });
//     return res.json({ success: true, review: doc });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    await History.deleteOne({ _id: id, userId });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
export { getPasHistory, deleteHistoryItem };
