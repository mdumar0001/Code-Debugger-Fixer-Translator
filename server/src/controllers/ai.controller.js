// const aiService = require("../services/ai.service");
// import aiService from "../services/ai.service.js";
// const getResponse = async (req, res) => {
//   const { code, sourceLang, targetLang } = req.body;

//   // Validate inputs
//   if (!code || !sourceLang || !targetLang) {
//     return res.status(400).json({
//       error: "code, sourceLang and targetLang are required",
//     });
//   }

//   try {
//     // send all 3 to service
//     const response = await aiService(code, sourceLang, targetLang);

//     return res.json({
//       convertedCode: response,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "AI service error" });
//   }
// };

// export default {
//   getResponse,
// };
// import { Request, Response } from "express";

import aiService from "../services/ai.service.js";

// import History from "../models/History.js";
import TranslateHistory from "../models/TranslateHistory.js";
const getResponse = async (req, res) => {
  const { code, sourceLang, targetLang } = req.body;
  const userId = req.user.id;
  // Validate inputs
  if (!code || !sourceLang || !targetLang) {
    return res.status(400).json({
      error: "code, sourceLang and targetLang are required",
    });
  }

  try {
    // send all 3 to service
    const response = await aiService(code, sourceLang, targetLang);
    const newHistory = new TranslateHistory({
      userId: req.user.id,
      // language,
      Sourcelanguage: sourceLang,
      Targetlanguage: targetLang,
      code,
      convertedCode: response,
      createdAt: new Date(),
    });

    const historyItem = await newHistory.save();

    return res.json({ success: true, convertedCode: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI service error" });
  }
};
// Controller for AI functionalities
// const aiController = {
//   debug: async (req, res) => {
//     try {
//       const { code, language } = req.body;
//       const debuggedCode = await debugCode(code, language || "JavaScript");
//       res.status(200).json({ success: true, debuggedCode });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   },
export default { getResponse };
//   translate: async (req, res) => {
//     try {
