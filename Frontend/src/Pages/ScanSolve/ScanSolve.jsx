import { useState } from "react";
import axios from "axios";
import Navbar from "../../Component/Navbar/navbar.jsx";

export default function ScanSolve() {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedFileName = image?.name || "No file selected";

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

      <section className="relative min-h-[calc(100vh-72px)] bg-linear-to-br from-indigo-950 via-purple-900 to-indigo-800 text-white overflow-hidden">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm tracking-widest uppercase text-purple-300 mb-4">
              AI Powered Problem Solver
            </p>

            <div className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <p className="text-sm tracking-widest uppercase text-purple-300 mb-4">
                Snap & Solve in seconds.
              </p>

              <p className="max-w-xl text-sm leading-7 text-slate-300 mb-8">
                Type your question or upload a photo of a problem, then let the AI provide instant, clear solutions.
              </p>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-100">Ask Anything</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full rounded-3xl border border-purple-500/70 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-purple-400"
                    placeholder="Enter your question..."
                  />
                </div>

                <button
                  onClick={handleSolveText}
                  className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-400 hover:scale-[1.02]"
                >
                  Solve Text
                </button>

                <div className="flex items-center gap-3 text-sm text-purple-200">
                  <span className="h-px flex-1 bg-white/10" />
                  <span>or</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-100">Or Upload an image of your problem</label>

                  <label
                    htmlFor="problem-image"
                    className="flex items-center justify-between rounded-3xl border border-purple-500/70 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:border-purple-400 cursor-pointer"
                  >
                    <span>{selectedFileName}</span>
                    <span className="rounded-full bg-purple-500 px-4 py-2 text-xs font-semibold text-white">Choose file</span>
                  </label>
                  <input
                    id="problem-image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="sr-only"
                  />

                  <button
                    onClick={handleSolveImage}
                    className="inline-flex items-center justify-center rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-600 hover:scale-[1.02]"
                  >
                    Upload & Solve
                  </button>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-5 text-sm text-slate-300">
                  <p className="font-semibold text-slate-100">Solution output</p>
                  <p className="mt-2 text-slate-400">The AI answer will appear below once processing completes.</p>
                </div>

                <label className="block text-sm font-semibold text-slate-100">Solution</label>

                <div className="rounded-4xl border border-purple-500/20 bg-slate-900/80 p-4 min-h-40 text-slate-200">
                  {loading ? (
                    <p className="text-sm">Solving...</p>
                  ) : answer ? (
                    <p className="whitespace-pre-line">{answer}</p>
                  ) : (
                    <p className="text-sm text-slate-400">No answer yet. Submit a question or upload an image to get started.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (UNCHANGED UI) */}
          <div className="relative flex justify-center items-center py-6">
            <div className="absolute w-56 h-56 sm:w-80 sm:h-80 bg-purple-500/40 blur-3xl rounded-full" />
            <div className="relative w-52 h-85 sm:w-64 sm:h-105 rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl border border-white/10 -rotate-6 sm:-rotate-12">
              <div className="absolute inset-4 rounded-2xl bg-linear-to-br from-purple-600 to-pink-500 flex items-center justify-center">
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
