const { GoogleGenerativeAI } = require("@google/generative-ai");

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

// ================= QUIZ GENERATION =================
exports.generateQuiz = async (req, res) => {
  try {
    const { category = "general", count = 5, context = "", topic = "" } = req.body;
    const allowedCategories = ["general", "math", "science"];

    // If a free-text topic is provided, prefer it over category validation.
    if (!topic && !allowedCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // Allow 1..50 questions (frontend limits to 50)
    const quizCount = Math.min(Math.max(Number(count) || 1, 1), 50);

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    // Use topic when provided, otherwise use category. Ask for JSON array of length quizCount.
    const subjectText = topic && topic.trim() ? `topic: '${topic.trim()}'` : `category: '${category}'`;
    const prompt = `Generate ${quizCount} multiple-choice quiz questions for ${subjectText}. Respond only with valid JSON: an array of ${quizCount} objects with keys 'question', 'options', and 'correctIndex'. Each object must have exactly 4 option strings and a correctIndex from 0 to 3. ${context ? `Use this context to tailor questions: ${context}` : ""}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response?.text();
    const quiz = parseJSONResponse(responseText);

    if (!Array.isArray(quiz) || quiz.length === 0) {
      console.error("❌ Invalid quiz response:", responseText);
      return res.status(500).json({ error: "Failed to generate quiz questions" });
    }

    const cleanedQuiz = quiz
      .filter((item) => item && item.question && Array.isArray(item.options) && item.options.length === 4)
      .slice(0, quizCount)
      .map((item) => ({
        question: String(item.question).trim(),
        options: item.options.map(String).map((option) => option.trim()),
        correctIndex: Math.min(Math.max(Number(item.correctIndex) || 0, 0), 3),
      }));

    if (cleanedQuiz.length === 0) {
      return res.status(500).json({ error: "AI returned invalid quiz data" });
    }

    res.json({ quiz: cleanedQuiz });
  } catch (err) {
    console.error("🔥 QUIZ GENERATION ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};

// ================= ANSWER EXPLANATION =================
exports.explainAnswer = async (req, res) => {
  try {
    const { question, options, selectedIndex, correctIndex } = req.body;

    if (!question || !Array.isArray(options) || options.length !== 4 || selectedIndex == null || correctIndex == null) {
      return res.status(400).json({ error: "Incomplete answer data" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    const prompt = `You are a friendly quiz tutor. The question is:\n${question}\nOptions:\n${options.map((option, idx) => `${idx + 1}. ${option}`).join("\n")}\nSelected answer: ${options[selectedIndex]}\nCorrect answer: ${options[correctIndex]}\nExplain whether the selected answer is correct, and provide a clear explanation.`;

    const result = await model.generateContent(prompt);
    const explanation = result.response?.text();

    if (!explanation) {
      return res.status(500).json({ error: "No explanation returned from AI" });
    }

    res.json({ explanation });
  } catch (err) {
    console.error("🔥 ANSWER EXPLANATION ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};
