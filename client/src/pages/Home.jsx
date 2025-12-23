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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-10">
        <div className="w-full max-w-4xl text-center flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Title */}
              <h1
                className="
    text-3xl md:text-5xl font-bold pb-4 mt-2
    bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400
    leading-tight
    break-words
    mx-auto
    max-w-[90%]
              "
              >
                {features[current].title}
              </h1>

              {/* Description */}
              <p
                className="
                mx-auto
                max-w-3xl
                text-base
                sm:text-lg
                md:text-xl
                text-gray-300
                leading-relaxed
              "
              >
                {features[current].desc}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Link
                  to="/Tdashboard"
                  className="
                    w-full
                    sm:w-auto
                    px-8
                    py-3
                    rounded-xl
                    text-base
                    sm:text-lg
                    font-semibold
                    bg-gradient-to-r
                    from-blue-600
                    to-green-600
                    shadow-lg
                    shadow-blue-500/20
                    transform
                    transition
                    hover:scale-105
                  "
                >
                  Translate Now →
                </Link>

                <Link
                  to="/dashboard"
                  className="
                    w-full
                    sm:w-auto
                    px-8
                    py-3
                    rounded-xl
                    text-base
                    sm:text-lg
                    font-semibold
                    bg-gradient-to-r
                    from-blue-600
                    to-green-600
                    shadow-lg
                    shadow-blue-500/20
                    transform
                    transition
                    hover:scale-105
                  "
                >
                  Debug Now →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="mt-10 flex justify-center gap-3">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`
                  h-3
                  rounded-full
                  transition-all
                  duration-300
                  ${i === current ? "bg-green-400 w-6" : "bg-gray-500 w-3"}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
