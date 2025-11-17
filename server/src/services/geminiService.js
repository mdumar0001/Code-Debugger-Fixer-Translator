// import axios from 'axios';

// const GEMINI_API_URL = process.env.GEMINI_API_URL;
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// export const debugCode = async (code) => {
//     try {
//         const response = await axios.post(`${GEMINI_API_URL}/debug`, {
//             code: code,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${GEMINI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Error debugging code: ' + error.message);
//     }
// };

// export const translateCode = async (code, targetLanguage) => {
//     try {
//         const response = await axios.post(`${GEMINI_API_URL}/translate`, {
//             code: code,
//             targetLanguage: targetLanguage,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${GEMINI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Error translating code: ' + error.message);
//     }
// };

// import axios from "axios";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// console.log(GEMINI_API_KEY);
// // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
// // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
// // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
// // const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
// // const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// export const debugCode = async (code) => {
//   try {
//     const prompt = `Debug the following code and explain the errors clearly:\n\n${code}`;
//     const response = await axios.post(
//       GEMINI_API_URL,
//       { contents: [{ parts: [{ text: prompt }] }] },
//       { headers: { "Content-Type": "application/json" } }
//     );
//     console.log("debuggin start wait...");
//     return (
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
//     );
//   } catch (error) {
//     throw new Error("Error debugging code: " + error.message);
//   }
// };

// export const translateCode = async (code, targetLanguage) => {
//   try {
//     const prompt = `Translate the following code into ${targetLanguage} and explain the conversion if needed:\n\n${code}`;
//     const response = await axios.post(
//       GEMINI_API_URL,
//       { contents: [{ parts: [{ text: prompt }] }] },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     return (
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
//     );
//   } catch (error) {
//     throw new Error("Error translating code: " + error.message);
//   }
// };

import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const debugCode = async (code, language) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
//     //     const prompt = `You are an expert ${language} developer. Find syntax and logical errors in the following code, explain them clearly, and provide a corrected version.

//     // Code:
//     // \`\`\`${language}
//     // ${code}
//     // \`\`\`

//     // Please respond in the following JSON format:
//     // {
//     //   "explanation": "Detailed explanation of errors and fixes",
//     //   "correctedCode": "The complete corrected code here"
//     // }`;
//     const prompt = ``;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     // Try to parse JSON response, fallback to text if needed
//     try {
//       const jsonResponse = JSON.parse(text);
//       // res.json(jsonResponse);
//       return jsonResponse;
//     } catch (parseError) {
//       // If Gemini doesn't return valid JSON, format it manually
//       // res.json({
//       //   explanation: text,
//       //   correctedCode: code, // Fallback to original code
//       // });
//       return {
//         explanation: text,
//         correctedCode: code, // Fallback to original code
//       };
//     }
//   } catch (error) {
//     console.error("Error calling Gemini API:", error);
//     // res.status(500).json({
//     //   error: "Failed to analyze code. Please try again.",
//     //   details: error.message,
//     // });
//     return {
//       error: "Failed to analyze code. Please try again.",
//       details: error.message,
//     };
//   }
// };

// export const debugCode = async (code, language) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // Build your required prompt
//     const prompt = `
// You are an opinionated and meticulous senior software engineer conducting a code review. Your goal is to help junior developers improve their code not just by fixing bugs, but by adhering to the highest standards of modern software development.

// Your response MUST be a single, raw JSON object and nothing else. Do not include any text, explanations, or markdown formatting before or after the JSON object.

// Analyze the provided code snippet and return a JSON object with these three keys:

// 1.  identifiedErrors:
//     *   This must be an array of strings.
//     *   First, list any critical bugs or errors found.
//     *   If no critical errors exist, you MUST find at least one suggestion for improvement (e.g., for readability, conciseness, performance, or using more modern syntax).
//     *   **If and only if the code is absolutely perfect and no improvements can be made**, this array must contain the single string: "No errors found! Your code is clean."

// 2.  explanation:
//     *   This must be a single string.
//     *   Provide a clear, friendly, and constructive explanation for any errors or suggestions you've made.
//     *   **If the code is perfect**, the explanation should be a simple confirmation, such as: "The code is already correct and doesn't contain any errors. No changes were made."

// 3.  suggestedFix:
//     *   This must be a single string containing the complete, refactored code that incorporates all your suggested fixes or improvements.
//     *   If no changes are made, return the original, unchanged code.

// Here is the code to analyze:
// Language: ${language}
// Code:
// ${code}
// `;

//     // Call Gemini API
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log("debuggin start wait...", code, language);
//     // Attempt to parse JSON
//     try {
//       console.log("debuggin start again wait...");
//       console.log("Gemini raw response:", text);
//       return JSON.parse(text);
//     } catch (parseError) {
//       console.warn("⚠ Gemini did NOT return valid JSON. Returning fallback.");

//       return {
//         identifiedErrors: ["Gemini did not return valid JSON."],
//         explanation: text,
//         suggestedFix: code, // fallback
//       };
//     }
//   } catch (error) {
//     console.error("Error calling Gemini API:", error);

//     return {
//       error: "Failed to analyze code. Please try again.",
//       details: error.message,
//     };
//   }
// };
// Removes markdown, backticks, escapes, and extracts pure JSON
function cleanGeminiOutput(raw) {
  if (!raw) return raw;

  let text = raw.trim();

  // Remove all markdown code fences like ```json or ``` anything
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove standalone backticks
  text = text.replace(/`+/g, "");

  // Remove escape characters like \n \t \"
  text = text.replace(/\\[nrt"]/g, "");

  // Remove double backslashes like \\
  text = text.replace(/\\\\/g, "");

  // Extract JSON object: text between first { and last }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  text = text.slice(start, end + 1);

  return text.trim();
}

export const debugCode = async (code, language) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Cleaner prompt without indentation issues
    //     const prompt = `
    // You are an opinionated and meticulous senior software engineer conducting a code review. Your goal is to help junior developers improve their code not just by fixing bugs, but by adhering to the highest standards of modern software development.

    // CRITICAL FORMATTING RULES:
    // - Your response MUST be a single, raw JSON object and nothing else
    // - DO NOT use markdown code blocks (no \`\`\`json or \`\`\`)
    // - DO NOT add any text, explanations, or formatting before or after the JSON object
    // - Your output will be processed directly by JSON.parse() - any wrappers will cause system errors
    // - Start with { and end with } - no exceptions

    // Analyze the provided code snippet and return a JSON object with these three keys:

    // 1. identifiedErrors:
    //    - An array of strings.
    //    - List any critical bugs or errors first.
    //    - If no critical errors exist, provide at least one suggestion for improvement.
    //    - If and only if the code is perfect, return ["No errors found! Your code is clean."]

    // 2. explanation:
    //    - A single string.
    //    - Explain the errors or suggestions constructively.
    //    - If perfect, say: "The code is already correct and doesn't contain any errors. No changes were made."

    // 3. suggestedFix:
    //    - A single string containing the full refactored code.
    //    - If no changes are needed, return the original code.

    // IMPORTANT: Your entire response must be valid JSON that can be parsed without any preprocessing.

    // Language: ${language}
    // Code:
    // ${code}
    // `.trim();
    //     const prompt = `
    // You are an opinionated and meticulous senior software engineer conducting a strict code review for ${language}. Your only job is to output a clean JSON object with no formatting issues.

    // ABSOLUTE NON-NEGOTIABLE RULES:
    // 1. Your response MUST be a single raw JSON object ONLY.
    // 2. DO NOT use markdown code blocks. Never output l (no \`\`\`json or \`\`\`) at all.
    // 3. DO NOT output escaped characters such as \n, \\, \", or any form of backslash escaping in the JSON values.
    // 4. All JSON string values must contain normal readable text without escape sequences.
    // 5. Do NOT add any text before or after the JSON object.
    // 6. Do NOT add explanations outside JSON.
    // 7. Your output will be directly parsed using JSON.parse(), so even a single extra character will cause failure.
    // 8. Start strictly with { and end strictly with }.

    // Analyze the provided code snippet and return a JSON object with exactly these keys:

    // 1. identifiedErrors:
    //    - An array of human-readable error messages.
    //    - Critical bugs first.
    //    - If no critical bugs exist, include at least one code improvement suggestion.
    //    - If the code is perfect, return: ["No errors found! Your code is clean."]

    // 2. explanation:
    //    - A single string.
    //    - Clear explanation of errors or suggestions.
    //    - If perfect, use: The code is already correct and doesn't contain any errors. No changes were made.

    // 3. suggestedFix:
    //    - A single string containing corrected or improved full code.
    //    - If no changes are needed, return the original code exactly as provided, without escaping or modification.
    // IMPORTANT RULE FOR suggestedFix:
    // - The suggestedFix MUST contain proper, human-written code with real newlines, real indentation, normal quotes, and normal backticks.
    // - REAL line breaks are allowed. DO NOT output escaped newlines like \n.
    // - DO NOT output any escape sequences (no \\, no \", no \t, no \n).
    // - DO NOT merge lines. Preserve proper formatting exactly as a human writes code.
    // - DO NOT wrap code in markdown blocks or backticks.
    // - All string literals MUST be wrapped in proper quotes (e.g., "Hello", 'Umar'). Bare identifiers MUST NOT be used as strings.
    // - Template literals MUST use real backticks  and MUST NOT be altered or escaped.
    // - The final code MUST be valid, executable code.

    // Language: ${language}
    // Code:
    // ${code}
    // `.trim();
    const prompt = `
You are an opinionated and meticulous senior software engineer conducting a strict code review for ${language}. Your only job is to output a clean, raw JSON object with no other text or formatting.

Your entire response MUST be a single, valid JSON object, starting with { and ending with }.
 CRITICAL FORMATTING RULES:
     - Your response MUST be a single, raw JSON object and nothing else
     - DO NOT use markdown code blocks (no \`\`\`json or \`\`\`)
     - DO NOT add any text, explanations, or formatting before or after the JSON object
     - Your output will be processed directly by JSON.parse() - any wrappers will cause system errors
     - Start with { and end with } - no exceptions
The JSON object must contain exactly these three keys:

1.  "identifiedErrors":
    *   An array of human-readable strings.
    *   List critical bugs first. If none exist, include at least one code improvement suggestion.
    *   If the code is absolutely perfect, the array must contain the single string: "No errors found! Your code is clean."

2.  "explanation":
    *   A single string providing a clear, constructive explanation of the errors or suggestions.
    *   If the code is perfect, use the string: "The code is already correct and doesn't contain any errors. No changes were made."

3.  "suggestedFix":
    *   A single string containing the complete, corrected, and well-formatted code.
    *   The string value MUST be formatted like code in a text editor, meaning it must include \\n for newlines to ensure proper structure.

---
IMPORTANT: Here is an example of the correct output format. Follow this structure precisely, especially for the suggestedFix value:
{
  "identifiedErrors": ["Example error: Missing semicolon."],
  "explanation": "This is an example explanation showing how the code was fixed.",
  "suggestedFix": "function example(name) {\\n  console.log(\\"Hello, \\" + name + \\"!\\");\\n}"
}
---

Now, analyze the code below based on these rules.

Language: ${language}
Code:
${code}
`.trim();

    // const result = await model.generateContent(prompt);
    // const response = result.response;
    // const text = response.text(); // no await

    // console.log("Gemini raw response:", text);

    // Attempt to parse clean JSON
    // try {
    //   return JSON.parse(text);
    // } catch {
    //   return {
    //     identifiedErrors: ["Gemini did not return valid JSON."],
    //     explanation: text,
    //     suggestedFix: code,
    //   };
    // }
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean the output
    // const cleaned = cleanGeminiOutput(text);

    console.log("Raw:", text);
    // console.log("Cleaned:", cleaned);

    // Try parsing final clean JSON
    try {
      return JSON.parse(text);
    } catch {
      return {
        identifiedErrors: ["Gemini returned malformed JSON"],
        explanation: text,
        suggestedFix: code,
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      error: "Failed to analyze code. Please try again.",
      details: error?.message,
    };
  }
};

export const translateCode = async (code, targetLanguage) => {
  try {
    const prompt = `Translate the following code into ${targetLanguage} and explain the conversion if needed:\n\n${code}`;
    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
    );
  } catch (error) {
    throw new Error("Error translating code: " + error.message);
  }
};

// export const performCodeAnalysis = async (code, language) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const analysisPrompt = `
// You are an expert ${language} code analyzer and senior developer. Conduct a thorough code review and identify ALL issues in the following code:

// CODE:
// \`\`\`${language}
// ${code}
// \`\`\`

// Conduct analysis in these categories:
// 1. SYNTAX ERRORS - Immediate compilation/parsing issues
// 2. LOGICAL ERRORS - Incorrect business logic or algorithms
// 3. RUNTIME ERRORS - Potential crashes, exceptions, undefined behavior
// 4. PERFORMANCE ISSUES - Inefficient algorithms, memory leaks, slow operations
// 5. SECURITY VULNERABILITIES - Injection, XSS, data exposure, authentication issues
// 6. CODE QUALITY - Anti-patterns, poor readability, maintenance issues
// 7. ERROR HANDLING - Missing try/catch, validation, edge cases
// 8. BEST PRACTICES - Language/framework conventions violations

// Respond with this EXACT JSON format:
// {
//   "summary": {
//     "totalIssues": number,
//     "criticalErrors": number,
//     "warnings": number,
//     "suggestions": number
//   },
//   "issues": [
//     {
//       "id": "unique_identifier",
//       "type": "syntax|logical|runtime|performance|security|quality|error_handling|best_practice",
//       "severity": "critical|high|medium|low",
//       "line": approximate_line_number_or_function_name,
//       "title": "brief_description",
//       "description": "detailed_explanation",
//       "impact": "what_could_happen_if_not_fixed",
//       "example": "code_snippet_showing_the_issue"
//     }
//   ],
//   "overallAssessment": "brief_summary_of_code_health"
// }`;

//   try {
//     const result = await model.generateContent(analysisPrompt);
//     const response = await result.response;
//     const text = response.text();

//     // Clean the response (remove markdown code blocks if present)
//     const cleanText = text.replace(/```json\s*|\s*```/g, "");
//     return JSON.parse(cleanText);
//   } catch (error) {
//     console.error("Analysis step failed:", error);
//     throw new Error("Failed to analyze code: " + error.message);
//   }
// };

// export const generateCodeFixes = async (originalCode, language, issues) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const fixPrompt = `
// You are an expert ${language} developer. Generate corrected code based on the analysis below.

// ORIGINAL CODE:
// \`\`\`${language}
// ${originalCode}
// \`\`\`

// IDENTIFIED ISSUES TO FIX:
// ${JSON.stringify(issues, null, 2)}

// INSTRUCTIONS FOR CORRECTION:
// 1. Fix ALL identified issues from the analysis
// 2. Maintain the original code's functionality and intent
// 3. Follow ${language} best practices and conventions
// 4. Add proper error handling and input validation
// 5. Ensure code is efficient, readable, and maintainable
// 6. Include comments only for non-obvious fixes
// 7. Preserve any existing comments that are still relevant
// 8. Consider edge cases and potential null/undefined values

// Respond with this EXACT JSON format:
// {
//   "correctedCode": "complete_corrected_code_here",
//   "explanation": "overall_explanation_of_changes_made",
//   "changesMade": [
//     {
//       "issueId": "from_analysis",
//       "changeType": "fix|optimize|refactor|add",
//       "description": "what_was_changed_and_why",
//       "before": "code_before_change",
//       "after": "code_after_change"
//     }
//   ],
//   "improvementsSummary": "list_of_main_improvements",
//   "testingRecommendations": "suggestions_for_testing_the_fixes"
// }`;

//   try {
//     const result = await model.generateContent(fixPrompt);
//     const response = await result.response;
//     const text = response.text();

//     const cleanText = text.replace(/```json\s*|\s*```/g, "");
//     return JSON.parse(cleanText);
//   } catch (error) {
//     console.error("Fix generation failed:", error);
//     throw new Error("Failed to generate fixes: " + error.message);
//   }
// };

// // Fallback for simple cases or if two-step fails
// export const debugCodeSingleStepasync = async (code, language) => {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const prompt = `You are an expert ${language} developer. Find and fix errors in this code:

// \`\`\`${language}
// ${code}
// \`\`\`

// Provide:
// 1. Explanation of errors found
// 2. Complete corrected code
// 3. Key improvements made

// Respond in JSON format:
// {
//   "explanation": "detailed_explanation",
//   "correctedCode": "full_corrected_code",
//   "improvements": ["list", "of", "improvements"]
// }`;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return JSON.parse(response.text());
// };
