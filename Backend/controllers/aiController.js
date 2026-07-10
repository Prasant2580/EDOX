const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const getModel = () => genAI.getGenerativeModel({ model: modelName });

exports.solveText = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) return res.status(400).json({ error: "Question is required" });

    const result = await getModel().generateContent(`Solve step-by-step with a clear explanation:\n${question.trim()}`);
    const answer = result.response?.text();
    if (!answer) return res.status(502).json({ error: "The AI service returned an empty response" });
    res.json({ answer });
  } catch (error) {
    console.error("AI text request failed:", error);
    res.status(502).json({ error: "Unable to generate an answer right now" });
  }
};

exports.solveImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No image uploaded" });
    if (!file.mimetype.startsWith("image/")) return res.status(400).json({ error: "Please upload an image file" });

    const result = await getModel().generateContent([
      { inlineData: { data: file.buffer.toString("base64"), mimeType: file.mimetype } },
      "Extract the question and solve it step-by-step with an explanation.",
    ]);
    const answer = result.response?.text();
    if (!answer) return res.status(502).json({ error: "The AI service returned an empty response" });
    res.json({ answer });
  } catch (error) {
    console.error("AI image request failed:", error);
    res.status(502).json({ error: "Unable to analyse this image right now" });
  }
};

exports.generateQuiz = async (req, res) => {
  try {
    const topic = req.body.topic?.trim();
    const requestedCount = Number(req.body.count);
    const count = Number.isInteger(requestedCount) ? Math.min(Math.max(requestedCount, 1), 50) : 5;

    if (!topic) return res.status(400).json({ error: "A quiz topic is required" });

    const prompt = `Create ${count} multiple-choice quiz questions about "${topic}". Return only valid JSON: an object with a "quiz" array. Every item must have "question" (string), "options" (an array of exactly 4 strings), and "correctIndex" (a zero-based number from 0 to 3). Do not use Markdown code fences.`;
    const result = await getModel().generateContent(prompt);
    const rawAnswer = result.response?.text()?.trim();
    const jsonAnswer = rawAnswer?.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    const parsed = JSON.parse(jsonAnswer);
    const quiz = Array.isArray(parsed.quiz) ? parsed.quiz : [];
    const validQuiz = quiz.filter((item) =>
      typeof item.question === "string" &&
      Array.isArray(item.options) && item.options.length === 4 && item.options.every((option) => typeof option === "string") &&
      Number.isInteger(item.correctIndex) && item.correctIndex >= 0 && item.correctIndex < 4
    );

    if (!validQuiz.length) return res.status(502).json({ error: "The AI returned an invalid quiz. Please try again." });
    res.json({ quiz: validQuiz });
  } catch (error) {
    console.error("Quiz generation failed:", error);
    res.status(502).json({ error: "Unable to generate a quiz right now" });
  }
};
