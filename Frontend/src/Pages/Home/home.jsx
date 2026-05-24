

// import { Link } from 'react-router-dom';

// export default function LearningFromHome() {
//   return (
//     <>
//       {/* Login Button */}
//       <div className="fixed top-4 right-4 z-10">
//         <Link to="/auth" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//           Sign up
//         </Link>
//       </div>

//       {/* Hero Section */}
//       <main className="grid min-h-screen grid-cols-1 items-center gap-10 px-5 pb-10 pt-20 sm:px-8 md:grid-cols-2 md:gap-12 md:px-12 lg:gap-[60px] lg:px-20">

//         {/* Left side */}
//         <div>
//           <h1 className="text-4xl font-extrabold leading-[1.1] mb-6 text-black sm:text-5xl lg:text-[56px]">
//             Learning <br /> From Home
//           </h1>

//           <p className="text-[#666] max-w-[420px] mb-8">
//             Unlock your potential from the comfort of home with flexible,
//             engaging online lessonss
//           </p>

//           <button className="px-8 py-3.5 rounded-full font-semibold 
//             bg-gradient-to-r from-yellow-400 to-orange-400">
//             Read More
//           </button>

//           <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10 mt-12 text-black">
//             <Stat value="350+" label="Subject Classes" />
//             <Stat value="400+" label="Video Materials" />
//             <Stat value="1500+" label="Happy Students" />
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="relative flex justify-center md:mt-0">
//           <div className="absolute w-[210px] h-[210px] sm:w-[280px] sm:h-[280px] bg-orange-300 
//             rounded-[50%_0_0_0] top-[-24px] right-0 md:right-[-60px] lg:right-[-80px]" />

//           <img
//             src="home_image.png"
//             alt="Student learning online"
//             className="relative w-full max-w-[380px] aspect-square object-cover 
//               rounded-[50%_50%_10%_50%] 
//               shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
//           />
//         </div>
//       </main>
//     </>
//   );
// }

// function Stat({ value, label }) {
//   return (
//     <div className="text-center">
//       <div className="text-[20px] font-bold">{value}</div>
//       <div className="text-sm text-[#777]">{label}</div>
//     </div>
//   );
// }




import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LearningFromHome() {
  const [isDark, setIsDark] = useState(false);

  const themeRoot = isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-gray-900';
  const navTheme = isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white/40 border-white/20';
  const heroHeadingColor = isDark ? 'text-white' : 'text-gray-900';
  const heroTextColor = isDark ? 'text-slate-300' : 'text-gray-600';
  const badgeTheme = isDark ? 'bg-orange-200/10 text-orange-300 ring-1 ring-orange-300/30' : 'bg-orange-100 text-orange-600';
  const watchButtonTheme = isDark ? 'border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800' : 'border-gray-300 bg-white/70 text-slate-900 hover:bg-white';
  const floatCardTheme = isDark ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'bg-white/70 border-white/30 text-slate-900';
  const floatCardSubText = isDark ? 'text-slate-400' : 'text-gray-500';
  const floatCardValueText = isDark ? 'text-white' : 'text-gray-900';
  const imageBorder = isDark ? 'border-slate-800' : 'border-white/30';
  const featureCardTheme = isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/60 border-white/30';
  const featureTitleColor = isDark ? 'text-white' : 'text-gray-900';
  const featureDescColor = isDark ? 'text-slate-300' : 'text-gray-600';
  const sectionHeadingColor = isDark ? 'text-white' : 'text-gray-900';
  const sectionSubtextColor = isDark ? 'text-slate-300' : 'text-gray-500';
  const premiumWhiteCardTheme = isDark ? 'bg-slate-900/70 border-slate-800 text-slate-100' : 'bg-white/70 border-white/30 text-gray-900';
  const premiumCyanCardTheme = isDark ? 'bg-slate-800 text-slate-100' : 'bg-cyan-100 text-gray-900';
  const premiumPurpleCardTheme = isDark ? 'bg-slate-800 text-slate-100' : 'bg-purple-100 text-gray-900';
  const premiumTextColor = isDark ? 'text-slate-300' : 'text-gray-500';
  const footerTheme = isDark ? 'border-slate-700 bg-slate-900/90' : 'border-t border-gray-200 bg-white/40';
  
  function Stat({ value, label, isDark }) {
    return (
      <div className={`backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center ${isDark ? 'bg-slate-900/70 border border-slate-800' : 'bg-white/60 border border-white/30'}`}>

        <div className={`text-2xl md:text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>

        <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-500'}`}>
          {label}
        </div>

      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden min-h-screen ${themeRoot}`}>

      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-orange-300/20 rounded-full blur-3xl animate-bounce" />

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl ${navTheme}`}>

        <nav className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            EDOX
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/auth"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`px-4 py-2.5 rounded-full font-semibold border transition-all duration-300 ${isDark ? 'border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700' : 'border-slate-200 bg-white/90 text-slate-900 hover:bg-slate-100'}`}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

        </nav>

      </header>

      {/* HERO SECTION */}
      <main className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm ${badgeTheme}`}>
            🚀 AI-Based Personalized Learning Platform
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 ${heroHeadingColor}`}
          >
            Learn Smarter <br />
            From Anywhere
          </motion.h1>

          <p className={`text-lg max-w-xl leading-relaxed mb-8 ${heroTextColor}`}>
            Unlock your future with interactive online learning,
            AI-powered study support, and premium courses designed
            for modern students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Link to="/auth" className="inline-flex justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Start Learning
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto sm:mx-0">
            <Stat value="350+" label="Subject Classes" isDark={isDark} />
            <Stat value="400+" label="Video Materials" isDark={isDark} />
            <Stat value="1500+" label="Happy Students" isDark={isDark} />
          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center min-h-[380px]"
        >

          {/* Main Glow */}
          <div className="absolute w-[420px] h-[420px] bg-gradient-to-br from-orange-300 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse" />

          {/* Floating Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-10 left-0 ${floatCardTheme} shadow-2xl rounded-3xl p-5 z-20 hidden md:block hover:-translate-y-3 hover:rotate-1 transition-all duration-500`}
          >

            <p className={`text-sm mb-1 ${floatCardSubText}`}>
              Learning Progress
            </p>

            <h3 className={`text-3xl font-black ${floatCardValueText}`}>
              Increasing
            </h3>

            <div className={`mt-2 text-green-500 text-sm font-semibold`}>
              ↑ Consistency streak
            </div>

          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`absolute bottom-10 right-0 ${floatCardTheme} shadow-2xl rounded-3xl p-5 z-20 hidden md:block hover:-translate-y-3 hover:-rotate-1 transition-all duration-500`}
          >

            <p className={`text-sm mb-1 ${floatCardSubText}`}>
              AI Study Assistant
            </p>

            <h3 className="text-2xl font-black text-green-500">
              Active
            </h3>

            <div className={`mt-2 text-sm ${floatCardSubText}`}>
              24/7 Support
            </div>

          </motion.div>

          {/* Main Image */}
          <img
            src="home_image.png"
            alt="Student learning online"
            className={`relative z-10 w-[280px] sm:w-[360px] md:w-[420px] lg:w-[520px] object-cover rounded-[50px] border ${imageBorder} shadow-[0_30px_100px_rgba(0,0,0,0.2)] hover:scale-105 hover:rotate-1 transition-all duration-700`}
          />

        </motion.div>

      </main>


      {/* FEATURES */}
      <section className="relative py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">

            <p className="uppercase tracking-[4px] text-orange-500 font-bold text-sm mb-3">
              WHY CHOOSE US
            </p>

            <h2 className={`text-4xl md:text-5xl font-black ${sectionHeadingColor}`}>
              Modern Learning Experience
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: '🎯',
                title: 'Live Classes',
                desc: 'Interactive sessions and real-time doubt solving.',
              },
              {
                icon: '⚡',
                title: 'Self-Paced',
                desc: 'Study at your own schedule with lifetime access.',
              },
              {
                icon: '🧠',
                title: 'AI Support',
                desc: 'Personalized learning powered by AI.',
              },
              {
                icon: '🌐',
                title: 'Any Device',
                desc: 'Learn on desktop, tablet, or mobile anytime.',
              },
            ].map((item) => (

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                key={item.title}
                className={`group ${featureCardTheme} backdrop-blur-xl rounded-3xl p-7 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500`}
              >

                <div className="w-14 h-14 rounded-2xl bg-amber-200 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className={`text-xl font-bold mb-3 ${featureTitleColor}`}>
                  {item.title}
                </h3>

                <p className={`text-sm leading-relaxed ${featureDescColor}`}>
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* PREMIUM BENTO SECTION */}
      <section className="py-24 px-6 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[5px]
            text-orange-500 font-bold text-sm mb-3">
              SMART LEARNING
            </p>

            <h2 className={`text-4xl md:text-6xl
            font-black leading-tight ${sectionHeadingColor}`}>
              Experience Future <br />
              Education
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">

            <div className="md:col-span-2 rounded-[40px]
            bg-gradient-to-br from-orange-400 to-pink-500
            p-10 text-white flex flex-col justify-between
            shadow-2xl hover:scale-[1.02]
            transition-all duration-500">

              <div>

                <h3 className="text-4xl font-black mb-5">
                  AI Personalized Learning
                </h3>

                <p className="text-white/90 max-w-xl text-lg">
                  Smart recommendations tailored to every student's learning style and progress.
                </p>

              </div>

              <div className="text-7xl">
                🧠
              </div>

            </div>

            <div className={`rounded-[40px] ${premiumWhiteCardTheme} p-8 shadow-2xl flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>

              <div>

                <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Learn Anytime
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Access courses anywhere, anytime on any device.
                </p>

              </div>

              <div className="text-6xl">
                🌍
              </div>

            </div>

            <div className="rounded-[40px]
            bg-gray-900 p-8 text-white
            flex flex-col justify-between
            hover:-translate-y-3 transition-all duration-500">

              <div>

                <h3 className="text-3xl font-black">
                  Live & Interactive
                </h3>

                <p className="text-gray-300 mt-2">
                  Real-time interaction sessions with doubt solving.
                </p>

              </div>

              <div className="text-6xl">
                🎥
              </div>

            </div>

            <div className={`rounded-[40px] ${premiumCyanCardTheme} p-8 flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>
              <div>

                <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Dashboard
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Track learning progress smartly.
                </p>

              </div>

              <div className="text-6xl">
                📊
              </div>
            </div>

            <div className={`rounded-[40px] ${premiumPurpleCardTheme} p-8 flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>
              <div>

                <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Smart Practice
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Interactive quizzes and real-time performance feedback.
                </p>

              </div>

              <div className="text-6xl">
                🏆
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-10 pb-24">

        <div className="max-w-6xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative text-center lg:text-left">
          <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-orange-400/20 rounded-full blur-3xl" />
          <div className="w-full lg:max-w-xl">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Start Your Learning Journey Today
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of students building skills and careers through
              AI-powered online education.
            </p>
          </div>

          <Link
            to="/auth"
            className="w-full sm:w-auto inline-flex justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Get Started Free
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <section className={`${footerTheme} backdrop-blur-xl py-8 px-6 md:px-10`}>
        <div className="max-w-full mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between items-center justify-between">

          <p className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            © 2026 EDOX. All rights reserved.
          </p>

          <div className={`flex flex-wrap justify-center items-center gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy
            </a>

            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms
            </a>

            <a href="#" className="hover:text-orange-500 transition-colors">
              Contact
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}









