import Navbar from "../../Component/Navbar/navbar";

export default function AboutUs() {
  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-b from-indigo-50 to-white">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
          About our WEBSITE
        </h1>

        <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
          <span className="text-indigo-600">EDOX</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl text-center leading-relaxed">
          An AI-based personalized e-learning platform that adapts to every
          student’s learning needs and provides instant doubt resolution.
        </p>

      </section>

      {/* Features Section */}
      <section className="relative flex justify-center px-4 sm:px-6 lg:px-12 py-12">

        {/* Background Glow */}
        <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-40 top-[-100px] left-1/2 -translate-x-1/2 -z-10"></div>

        <div className="max-w-6xl w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center">

          {/* Card 1 */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 bg-white">
            
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                alt=""
              />
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                AI Personalized Learning
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                EDOX analyzes student performance and provides customized study
                plans for better learning outcomes.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 bg-white">
            
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                alt=""
              />
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Snap & Solve
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Students can upload images of questions and receive step-by-step
                solutions using OCR and AI.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 bg-white">
            
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-lg">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                alt=""
              />
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Learning Smarter
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Experience the future of education with artificial intelligence.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}