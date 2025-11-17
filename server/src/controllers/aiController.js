// import { Request, Response } from "express";
import {
  debugCode,
  translateCode,
  // performCodeAnalysis,
  // generateCodeFixes,
  // debugCodeSingleStepasync,
} from "../services/geminiService.js";

import History from "../models/History.js";
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
const aiController = {
  debug: async (req, res) => {
    try {
      const { code, language } = req.body;

      const debuggedCode = await debugCode(code, language || "JavaScript");
      console.log(language);
      const newHistory = new History({
        userId: req.user.id,
        language,
        code,
        debuggedCode,
        createdAt: new Date(),
      });

      const historyItem = await newHistory.save();

      // Send ONLY ONE RESPONSE
      return res.status(201).json({
        success: true,
        debuggedCode,
        historyItem,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  translate: async (req, res) => {
    try {
      const { code, targetLanguage } = req.body;
      const translatedCode = await translateCode(code, targetLanguage);
      res.status(200).json({ success: true, translatedCode });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default aiController;

// router.post("/debug-code-enhanced", async (req, res) => {
//   try {
//     const { code, language, mode = "two-step" } = req.body;

//     if (!code || !language) {
//       return res.status(400).json({
//         error: "Code and language are required",
//       });
//     }

//     let result;

//     if (mode === "two-step") {
//       try {
//         // Two-step approach for better quality
//         const analysis = await performCodeAnalysis(code, language);
//         const fixes = await generateCodeFixes(code, language, analysis.issues);

//         result = {
//           success: true,
//           mode: "two-step",
//           analysis: analysis,
//           fixes: fixes,
//         };
//       } catch (twoStepError) {
//         console.log(
//           "Two-step failed, falling back to single-step:",
//           twoStepError
//         );
//         // Fallback to single-step
//         result = await debugCodeSingleStep(code, language);
//         result.mode = "single-step-fallback";
//       }
//     } else {
//       // Direct single-step
//       result = await debugCodeSingleStep(code, language);
//       result.mode = "single-step";
//     }

//     res.json({
//       ...result,
//       timestamp: new Date().toISOString(),
//       language: language,
//       originalCodeLength: code.length,
//       correctedCodeLength: result.correctedCode?.length || 0,
//     });
//   } catch (error) {
//     console.error("Debugging endpoint error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to process code debugging request",
//       details: error.message,
//     });
//   }
// });
// debugCode: async (req, res) => {
//   try {
//     const { code, javascriptlang, mode = "two-step" } = req.body;
//     console.log("Incoming Body:", req.body);
//     if (!code || !javascriptlang) {
//       return res.status(400).json({
//         error: "Code and language are required",
//       });
//     }

//     let result;

//     if (mode === "two-step") {
//       try {
//         // Two-step approach for better quality
//         const analysis = await performCodeAnalysis(code, javascriptlang);
//         const fixes = await generateCodeFixes(
//           code,
//           javascriptlang,
//           analysis.issues
//         );

//         result = {
//           success: true,
//           mode: "two-step",
//           analysis: analysis,
//           fixes: fixes,
//         };
//       } catch (twoStepError) {
//         console.log(
//           "Two-step failed, falling back to single-step:",
//           twoStepError
//         );
//         // Fallback to single-step
//         result = await debugCodeSingleStepasync(code, language);
//         result.mode = "single-step-fallback";
//       }
//     } else {
//       // Direct single-step
//       result = await debugCodeSingleStepasync(code, language);
//       result.mode = "single-step";
//     }

//     res.json({
//       ...result,
//       timestamp: new Date().toISOString(),
//       language: javascriptlang,
//       originalCodeLength: code.length,
//       correctedCodeLength: result.correctedCode?.length || 0,
//     });
//   } catch (error) {
//     console.error("Debugging endpoint error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to process code debugging request",
//       details: error.message,
//     });
//   }
// },
