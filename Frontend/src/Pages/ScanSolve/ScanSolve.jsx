import { useState } from "react";
import axios from "axios";
import Navbar from "../../Component/Navbar/navbar.jsx";

export default function ScanSolve() {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // TEXT SOLVE
  const handleSolveText = async () => {
    if (!question) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/ai/solve-text", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error solving problem");
    } finally {
      setLoading(false);
    }
  };

  // IMAGE SOLVE
  const handleSolveImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/ai/solve-image", formData);
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error processing image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="relative min-h-[calc(100vh-72px)] bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800 text-white overflow-hidden">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm tracking-widest uppercase text-purple-300 mb-4">
              AI Powered Problem Solver
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
              <span className="text-pink-400">Snap & Solve</span>
              <div className="text-sm mt-2 text-purple-200">
                Upload or type your question and get step-by-step solutions.
              </div>
            </h1>

            {/* TEXT INPUT */}
            <div className="mb-4">
              <label className="block text-purple-300 mb-2">Ask Anything:</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 rounded bg-black/30 border border-purple-500"
                placeholder="Enter your question..."
              />
            </div>

            <button
              onClick={handleSolveText}
              className="bg-pink-500 px-6 py-2 rounded hover:scale-105 transition"
            >
              Solve Text
            </button>

            {/* IMAGE UPLOAD */}
            <div className="mt-6">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="mb-2 block w-full text-sm"
              />

              <button
                onClick={handleSolveImage}
                className="bg-purple-500 px-6 py-2 rounded transition hover:bg-purple-600 sm:hover:scale-105"
              >
                Upload & Solve
              </button>
            </div>

            {/* RESULT */}
            <div className="mt-6">
              <label className="block text-purple-300 mb-2">Solution:</label>

              <div className="w-full min-h-[120px] p-4 bg-black/40 border border-purple-500 rounded">
                {loading ? "Solving..." : answer}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (UNCHANGED UI) */}
          <div className="relative flex justify-center items-center py-6">
            <div className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-purple-500/40 blur-3xl rounded-full" />
            <div className="relative w-52 h-[340px] sm:w-64 sm:h-[420px] rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-white/10 -rotate-6 sm:-rotate-12">
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-lg grid grid-cols-5 grid-rows-5 gap-1 p-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        Math.random() > 0.5 ? "bg-black" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
