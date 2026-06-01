const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Ensure API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function parseJSONResponse(text) {
  if (!text) return null;
  try {
    return JSON.parse(text.trim());
  } catch {
    const match = text.match(/\[.*\]/s);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

// ================= TEXT SOLVE =================
exports.solveText = async (req, res) => {
  try {
    console.log("📥 Incoming Body:", req.body);

    const { question } = req.body;

    // ✅ Validate input
    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash", // ✅ safer stable model
    });

    const result = await model.generateContent(
      // `Solve step-by-step with clear explanation:\n${question}`
      `solve according to the given question and provide a clear answer against the question:\n${question}`
    );

    const response = result.response;
    const text = response?.text();

    // ✅ Safe response check
    if (!text) {
      console.error("❌ Empty AI response:", response);
      return res.status(500).json({ error: "No response from AI" });
    }

    console.log("✅ AI Response:", text);

    res.json({ answer: text });

  } catch (err) {
    console.error("🔥 TEXT ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

// ================= IMAGE SOLVE =================
exports.solveImage = async (req, res) => {
  try {
    console.log("📥 File Received:", req.file);

    const file = req.file;

    // ✅ Validate file
    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: file.buffer.toString("base64"),
          mimeType: file.mimetype,
        },
      },
      "Extract the question and solve it accordingly to the given text and/or image.",
    ]);

    const response = result.response;
    const text = response?.text();

    // ✅ Safe response check
    if (!text) {
      console.error("❌ Empty AI response:", response);
      return res.status(500).json({ error: "No response from AI" });
    }

    console.log("✅ AI Image Response:", text);

    res.json({ answer: text });

  } catch (err) {
    console.error("🔥 IMAGE ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};