// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const About = () => {
//   return (
//     <div className="min-h-screen pt-28 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white py-20 px-6">
//       <div className="max-w-5xl mx-auto space-y-16">
//         {/* <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl md:text-6xl font-bold pb-4 text-center
//           bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400"
//         >
//           About Our AI Debugger
//         </motion.h1> */}
//         <h1
//           className="text-4xl md:text-6xl font-bold pb-4 text-center
//           bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400"
//         >
//           About Our AI Debugger
//         </h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="text-lg md:text-xl text-gray-300 text-center leading-relaxed max-w-3xl mx-auto"
//         >
//           We are building the next generation of AI-powered tools that help
//           developers debug, fix, translate, and improve code faster than ever.
//           Our mission is to make coding simple, efficient, and intelligent for
//           everyone — from beginners to expert software engineers.
//         </motion.p>

//         <div className="grid md:grid-cols-2 gap-10">
//           {[
//             {
//               title: "Real-Time AI Debugging",
//               desc: "Instant error identification, fixes, and explanations powered by advanced AI.",
//             },
//             {
//               title: "Multi-Language Support",
//               desc: "From JavaScript to Python, C++, Java, and more — debug any language instantly.",
//             },
//             {
//               title: "Live Suggestions",
//               desc: "Write smarter with AI-powered CodeMirror suggestions as you type.",
//             },
//             {
//               title: "Secure & Reliable",
//               desc: "Protected with JWT authentication and encrypted user data.",
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 backdrop-blur-md shadow-lg hover:shadow-green-500/10 transition"
//             >
//               <h3 className="text-2xl font-semibold text-green-400">
//                 {item.title}
//               </h3>
//               <p className="mt-3 text-gray-300 leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="bg-gray-800/30 border border-gray-700 p-10 rounded-3xl text-center shadow-xl backdrop-blur-lg"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-blue-400">
//             Our Vision
//           </h2>
//           <p className="text-lg md:text-xl text-gray-300 mt-4 leading-relaxed max-w-3xl mx-auto">
//             We aim to become the world’s smartest AI-based debugging assistant.
//             We want developers to spend less time fixing issues and more time
//             building amazing products.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="flex justify-center"
//         >
//           <Link
//             to="/login"
//             className="px-10 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xl font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
//           >
//             Start Debugging →
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white px-6 pt-40 pb-20">
      <div className="max-w-5xl mx-auto space-y-16">
        <h1
          className="text-4xl md:text-6xl font-bold pb-4 text-center 
          bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400"
        >
          About Our AI Debugger
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 text-center leading-relaxed max-w-3xl mx-auto"
        >
          We are building the next generation of AI-powered tools that help
          developers debug, fix, translate, and improve code faster than ever.
          Our mission is to make coding simple, efficient, and intelligent for
          everyone — from beginners to expert software engineers.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "Real-Time AI Debugging",
              desc: "Instant error identification, fixes, and explanations powered by advanced AI.",
            },
            {
              title: "Multi-Language Support",
              desc: "From JavaScript to Python, C++, Java, and more — debug any language instantly.",
            },
            {
              title: "Live Suggestions",
              desc: "Write smarter with AI-powered CodeMirror suggestions as you type.",
            },
            {
              title: "Secure & Reliable",
              desc: "Protected with JWT authentication and encrypted user data.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 backdrop-blur-md 
              shadow-lg hover:shadow-green-500/10 transition"
            >
              <h3 className="text-2xl font-semibold text-green-400">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/30 border border-gray-700 p-10 rounded-3xl 
          text-center shadow-xl backdrop-blur-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400">
            Our Vision
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mt-4 leading-relaxed max-w-3xl mx-auto">
            We aim to become the world’s smartest AI-based debugging assistant.
            We want developers to spend less time fixing issues and more time
            building amazing products.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/login"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-green-600 
            text-white text-xl font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Start Debugging →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
