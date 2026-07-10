import { useState } from "react";
import { Menu, X, LayoutDashboard, BookOpen, Plus } from "lucide-react";
import Navbar from "../../Component/Navbar/Navbar.jsx";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentIndex] || { question: "", options: [] };
  const progressLabel = isStarted ? `${currentIndex + 1}/${quizQuestions.length}` : "Ready to start";

  const startQuiz = async () => {
    if (!topic || !topic.trim()) {
      setFeedback("Please enter a quiz topic before starting.");
      return;
    }

    setLoadingQuiz(true);
    setFeedback("Starting quiz...");

    try {
      const payload = { topic: topic.trim(), count: questionCount };

      const response = await api.post("/ai/quiz/generate", payload);
      let questions = Array.isArray(response.data.quiz) ? response.data.quiz : [];

      if (!questions.length) {
        setQuizQuestions([]);
        setIsStarted(false);
        setFeedback("AI did not return questions for this topic. Try again or adjust the topic.");
        return;
      }

      setQuizQuestions(
        questions.map((question) => ({
          ...question,
          options: [...question.options],
        }))
      );
      setIsStarted(true);
      setFinished(false);
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
      setFeedback("Quiz started! Choose an answer below.");
    } catch (error) {
      console.error("Quiz generation failed:", error);
      setQuizQuestions([]);
      setIsStarted(false);
      setFinished(false);
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
      setFeedback(error?.response?.data?.error || "AI quiz generation failed. Please try again.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (selectedOption !== null || finished) return;

    setSelectedOption(answerIndex);

    if (currentQuestion.correctIndex === answerIndex) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! Nice work.");
    } else {
      setFeedback(
        `Oops, the correct answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`
      );
    }
  };

  const handleNext = () => {
    if (!isStarted) return;
    if (finished) {
      restartQuiz();
      return;
    }

    if (currentIndex + 1 === quizQuestions.length) {
      setFinished(true);
      setFeedback(`Quiz complete! You scored ${score}/${quizQuestions.length}.`);
      setSelectedOption(null);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setFeedback("");
  };

  const restartQuiz = () => {
    setIsStarted(false);
    setFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizQuestions([]);
    setFeedback("");
  };

  const SidebarContent = () => (
    <>
      <div className="mb-10 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Edox</h1>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-indigo-700 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="space-y-2 text-sm">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard");
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors bg-indigo-500 text-white hover:bg-indigo-700"
        >
          <LayoutDashboard className="w-4 h-4" />
          My Courses
        </button>

        <button
          type="button"
          onClick={() => {
            navigate("/dashboard");
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors bg-indigo-500 text-white hover:bg-indigo-700"
        >
          <BookOpen className="w-4 h-4" />
          All Courses
        </button>

        <button
          type="button"
          onClick={() => {
            /* Quiz is current page - keep sidebar open closed and indicate active */
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-white text-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Quiz
        </button>

        <button
          type="button"
          onClick={() => {
            navigate("/notes");
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Notes
        </button>
      </nav>
    </>
  );

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 w-full bg-[#090b16]">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,82vw)] flex-col bg-indigo-600 p-6 text-white shadow-2xl transition-transform duration-300 md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </aside>

        <main className="flex-1 w-full min-w-0 overflow-hidden relative">
          <div className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#090b16] text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_22%)]" />
            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8 lg:py-14">
              <div className="flex items-center gap-3 mb-6 md:hidden">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <h2 className="truncate text-xl font-semibold text-white">Quiz</h2>
              </div>

              <div className="grid gap-8 grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Interactive Quiz Builder
                  </p>
                  <h3 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Set a topic and let AI build your quiz.
                  </h3>
                  <p className="max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
                    Enter any topic and enjoy a responsive quiz experience powered by AI.
                  </p>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Quiz topic</p>
                    <label className="mt-3 block text-sm text-slate-200">
                      Type any topic to generate a quiz.
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="E.g. European history, React hooks, algebra"
                        className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-200 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />
                    </label>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Number of questions</p>
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="w-14 text-right font-semibold">{questionCount}</div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">Choose up to 50 questions for the quiz.</p>
                  </div>
                </div>


                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={startQuiz}
                    disabled={loadingQuiz}
                    className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-cyan-300 hover:bg-cyan-400"
                  >
                    {loadingQuiz ? "Loading quiz..." : isStarted ? "Restart quiz" : "Start quiz"}
                  </button>
                  <p className="text-sm text-slate-400">Built for fast practice and instant feedback.</p>
                </div>

                {feedback && (
                  <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                    {feedback}
                  </div>
                )}
              </div>
            </section>

            <div className="rounded-[30px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Current quiz</p>
                  <h3 className="mt-2 text-2xl font-semibold uppercase text-white">{topic ? `${topic} quiz` : "Custom quiz"}</h3>
                </div>
                <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
                  {finished ? "Finished" : isStarted ? `In progress • ${progressLabel}` : "Waiting"}
                </div>
              </div>

              <div className="mt-6 min-h-80 rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                {isStarted ? (
                  <>
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Question</p>
                        <p className="mt-2 text-xl font-semibold text-white">{currentQuestion.question}</p>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                        {progressLabel}
                      </span>
                    </div>

                    <div className="grid gap-3">
                      {currentQuestion.options.map((option, optionIndex) => {
                        const isCorrect = selectedOption !== null && optionIndex === currentQuestion.correctIndex;
                        const isSelected = selectedOption === optionIndex;

                        return (
                          <button
                            key={optionIndex}
                            type="button"
                            onClick={() => handleAnswer(optionIndex)}
                            className={`group w-full rounded-3xl border px-5 py-4 text-left text-sm font-medium transition ${
                              selectedOption === null
                                ? "border-white/10 bg-white/5 text-slate-100 hover:border-cyan-400/50 hover:bg-slate-900"
                                : isCorrect
                                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                                : isSelected
                                ? "border-rose-500/40 bg-rose-500/15 text-rose-100"
                                : "border-white/10 bg-white/5 text-slate-300"
                            }`}
                            disabled={selectedOption !== null || finished}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-400">Score: {score} / {quizQuestions.length}</p>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        {finished ? "Restart Quiz" : "Next Question"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center">
                    <p className="text-lg font-semibold text-white">Launch your first quiz.</p>
                    <p className="mt-3 text-slate-400">Enter a topic, then tap Start quiz to get instant quiz questions.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-[30px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Quiz experience</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Responsive, clear, and interactive.</h2>
                  <p className="mt-3 text-slate-400">
                    This quiz page adapts to all screen sizes and lets learners practice with AI-generated topic quizzes.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Topic quizzes</p>
                    <p className="mt-2 text-slate-300">Type any topic and generate a quiz instantly.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">AI-generated questions</p>
                    <p className="mt-2 text-slate-300">Get fresh quiz questions from the backend on every attempt.</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">How to play</p>
                  <ol className="mt-4 space-y-3 text-slate-300">
                    <li className="rounded-2xl bg-slate-950/80 p-4">1. Enter a quiz topic.</li>
                    <li className="rounded-2xl bg-slate-950/80 p-4">2. Start the quiz to load questions from AI.</li>
                    <li className="rounded-2xl bg-slate-950/80 p-4">3. Answer each question and move through the quiz.</li>
                  </ol>
                </div>
              </div>
            </aside>

            <section className="mt-10 grid gap-8">
              <div className="mx-auto w-full max-w-4xl rounded-[30px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/25 md:p-8">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Quiz preview</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Ready to practice</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
                      <p className="text-sm font-semibold text-white">Topic-based quizzes</p>
                      <p className="mt-3">Enter any topic to load fresh quiz questions from the AI backend.</p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
                      <p className="text-sm font-semibold text-white">Instant feedback</p>
                      <p className="mt-3">Answer questions and receive immediate score updates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
