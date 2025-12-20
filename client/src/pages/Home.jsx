import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Live AI Code Suggestions",
    desc: "Experience real-time intelligent suggestions powered by CodeMirror and advanced AI models. Write faster, fix issues instantly.",
  },
  {
    title: "Multi-Language Support",
    desc: "Debug, fix, and translate code across all major programming languages with seamless switching and accuracy.",
  },
  {
    title: "Full Error Detection",
    desc: "Get a comprehensive list of all syntax, logical, and structural errors with prioritized categorization.",
  },
  {
    title: "AI Code Debugging & Fixing",
    desc: "Automatically detect issues and generate corrected, optimized code with explanations.",
  },
  {
    title: "Smart Explanation & Improvements",
    desc: "Understand your errors with AI-powered explanations and get high-quality improvement suggestions.",
  },
  {
    title: "Language Translation Engine",
    desc: "Translate code, documentation, or comments into any language using powerful AI translation models.",
  },
  {
    title: "Debug History Sidebar",
    desc: "Access all your past debugging sessions instantly with an intuitive, searchable sidebar.",
  },
  {
    title: "Secure Authentication",
    desc: "Your data stays protected with JWT authentication, hashed passwords, and secure access control.",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-violet-900 via-violet to-blue-150 text-white flex items-center justify-center overflow-hidden relative px-6">
    //   {/* Slides Container */}
    // <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-500 to-indigo-200 text-white flex items-center justify-center overflow-hidden relative px-6">
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center overflow-hidden relative px-6">
      <div className="max-w-2xl text-center min-h-[380px] md:min-h-[420px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1
              className="
    text-3xl md:text-5xl font-bold pb-4
    bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400
    leading-tight 
    break-words 
    mx-auto 
    max-w-[90%]
  "
            >
              {features[current].title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {features[current].desc}
            </p>

            {/* CTA Button */}
            <div className="">
              {" "}
              <Link
                to="/Tdashboard"
                className="inline-block px-8 py-3 mr-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 shadow-lg shadow-blue-500/20 hover:scale-105 transform transition"
              >
                Translate Now →
              </Link>
              <Link
                to="/dashboard"
                className="inline-block px-8 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 shadow-lg shadow-blue-500/20 hover:scale-105 transform transition"
              >
                Debug Now →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bullet Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === current ? "bg-green-400 w-6" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
