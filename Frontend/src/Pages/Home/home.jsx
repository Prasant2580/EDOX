
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LearningFromHome() {
  const themeRoot = 'bg-[#f8fafc] text-gray-900';
  const navTheme = 'bg-white/40 border-white/20';
  const heroHeadingColor = 'text-gray-900';
  const heroTextColor = 'text-gray-600';
  const badgeTheme = 'bg-orange-100 text-orange-600';
  const floatCardTheme = 'bg-white/70 border-white/30 text-slate-900';
  const floatCardSubText = 'text-gray-500';
  const floatCardValueText = 'text-gray-900';
  const imageBorder = 'border-white/30';
  const featureCardTheme = 'bg-white/60 border-white/30';
  const featureTitleColor = 'text-gray-900';
  const featureDescColor = 'text-gray-600';
  const sectionHeadingColor = 'text-gray-900';
  const premiumWhiteCardTheme = 'bg-white/70 border-white/30 text-gray-900';
  const premiumCyanCardTheme = 'bg-cyan-100 text-gray-900';
  const premiumPurpleCardTheme = 'bg-purple-100 text-gray-900';
  const premiumTextColor = 'text-gray-500';
  const footerTheme = 'border-t border-gray-200 bg-white/40';
  
  function Stat({ value, label }) {
    return (
      <div className="backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg hover:-translate-y-2 transition-all duration-300 text-center bg-white/60 border border-white/30">

        <div className="text-2xl md:text-3xl font-black mb-1 text-gray-900">
          {value}
        </div>

        <div className="text-sm text-gray-500">
          {label}
        </div>

      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden min-h-screen ${themeRoot}`}>

      {/* Animated Gradient Blobs */}
      <div className="absolute -top-30 -left-25 w-87.5 h-87.5 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-30 -right-25 w-87.5 h-87.5 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[40%] left-[45%] w-62.5 h-62.5 bg-orange-300/20 rounded-full blur-3xl animate-bounce" />

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl ${navTheme}`}>

        <nav className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">
            EDOX
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              to="/auth"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

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

          <p className={`text-lg max-w-3xl leading-relaxed mb-8 ${heroTextColor}`}>
            Unlock your future with interactive online learning,
            AI-powered study support, and premium courses designed
            for modern students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Link to="/auth" className="inline-flex justify-center w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Start Learning
            </Link>
          </div>

          {/* STATS */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto sm:mx-0">
            <Stat value="350+" label="Subject Classes" isDark={isDark} />
            <Stat value="400+" label="Video Materials" isDark={isDark} />
            <Stat value="1500+" label="Happy Students" isDark={isDark} />
          </div> */}

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center min-h-95"
        >

          {/* Main Glow */}
          <div className="absolute w-105 h-105 bg-linear-to-br from-orange-300 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse" />

          {/* Floating Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-10 left-0 ${floatCardTheme} shadow-2xl rounded-3xl p-5 z-20 hidden md:block hover:-translate-y-3 hover:rotate-1 transition-all duration-500`}
          >

            <label className={`text-blue-600 text-sm mb-1 ${floatCardSubText}`}>
              Learning Progress
            </label>

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

            <label className={`text-blue-600 text-sm mb-1 ${floatCardSubText}`}>
              AI Study Assistant
            </label>

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
            className={`relative z-10 w-70 sm:w-90 md:w-105 lg:w-130 object-cover rounded-[50px] border ${imageBorder} shadow-[0_30px_100px_rgba(0,0,0,0.2)] hover:scale-105 hover:rotate-1 transition-all duration-700`}
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
                title: 'Live Interaction',
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[240px]">

            <div className="md:col-span-2 rounded-[40px]
            bg-linear-to-br from-orange-400 to-pink-500
            p-10 text-white flex flex-col justify-between
            shadow-2xl hover:scale-[1.02]
            transition-all duration-500">

              <div>

                <h3 className="text-3xl font-black mb-5">
                  AI Personalized Learning
                </h3>

                <p className="text-white/90 max-w-xl text-lg">
                  Smart recommendations tailored to every student's learning style and progress.
                </p>

              </div>

              <div className="text-5xl">
                🧠
              </div>

            </div>

            <div className={`rounded-[40px] ${premiumWhiteCardTheme} p-8 shadow-2xl flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>

              <div>

                <h3 className="text-3xl font-black text-gray-900">
                  Learn Anytime
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Access courses anywhere, anytime on any device.
                </p>

              </div>

              <div className="text-5xl">
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

              <div className="text-5xl">
                🎥
              </div>

            </div>

            <div className={`rounded-[40px] ${premiumCyanCardTheme} p-8 flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>
              <div>

                <h3 className="text-3xl font-black text-gray-900">
                  Dashboard
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Track learning progress smartly.
                </p>

              </div>

              <div className="text-5xl">
                📊
              </div>
            </div>

            <div className={`rounded-[40px] ${premiumPurpleCardTheme} p-8 flex flex-col justify-between hover:-translate-y-3 transition-all duration-500`}>
              <div>

                <h3 className="text-3xl font-black text-gray-900">
                  Smart Practice
                </h3>

                <p className={`${premiumTextColor} mt-2`}>
                  Interactive quizzes and real-time performance feedback.
                </p>

              </div>

              <div className="text-5xl">
                🏆
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-10 pb-24">

        <div className="max-w-6xl mx-auto bg-linear-to-r from-gray-900 via-gray-800 to-black rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative text-center lg:text-left">
          <div className="absolute -top-12.5 -right-12.5 w-45 h-45 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="w-full lg:max-w-xl">

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Start Your Learning Journey Today
            </h3>

            <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of students building skills and careers through
              AI-powered online education.
            </p>
          </div>

          <Link
            to="/auth"
            className="w-full sm:w-auto inline-flex justify-center px-8 py-4 rounded-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-bold shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Get Started Free
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <section className={`${footerTheme} backdrop-blur-xl py-8 px-6 md:px-10`}>
        <div className="max-w-full mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between items-center justify-between">

          <p className="text-sm text-center text-gray-500">
            © 2026 EDOX. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
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









