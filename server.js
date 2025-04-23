// Remove OpenAI imports
// const { OpenAI } = require("openai");

// Add Gemini AI imports
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY"); // Replace with your actual Gemini API Key

const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Multer config for file uploads
const upload = multer({ dest: "uploads/" });

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    // Reading the resume
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;
    const jobRole = req.body.role;

    // Use Gemini API to analyze the resume
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a professional resume reviewer. Read the following resume text and provide personalized, specific, and constructive feedback on how to improve it:

Resume Text:
${resumeText}

Job Role: ${jobRole}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiFeedback = response.text();

    res.json({ result: aiFeedback }); // Sending the feedback to frontend

    fs.unlinkSync(req.file.path); // Clean up the uploaded file
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

console.log("Starting server...");

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
