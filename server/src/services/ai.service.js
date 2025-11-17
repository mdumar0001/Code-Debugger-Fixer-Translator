// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `you are code converter 
    Translate the following code from sourceLang to targetLang.
    Your response must only contain the translated code and minimal comment for better understanding.
    if stirng and other question give simple "Sorry! Write correct Code"
    only convert code in one coding lnaguage to another coding language. 
    Do not include any explanations, or any text other than the code itself.
    Do not use markdown code blocks in your response.`,
});

async function generateContent(code, sourceLang, targetLang) {
  const prompt = `Convert this code from ${sourceLang} to ${targetLang}.
Source Code:${code}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export default generateContent;
