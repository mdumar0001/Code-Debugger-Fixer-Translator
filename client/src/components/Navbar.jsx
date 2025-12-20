import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { token, setToken, presentDash, setPresentDash } =
    useContext(AuthContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  const navc = presentDash ? "Translate" : "Debug";
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-green-900">
      {/* NAVBAR */}
      <div className="backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-lg">
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            AI Code Debugger Fixer & Translator
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 font-medium">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-green-400 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}{" "}
            <NavLink
              // key={item.path}on
              onClick={() => setPresentDash(!presentDash)}
              to={presentDash ? "/Tdashboard" : "/dashboard"}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {navc}
            </NavLink>
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-5">
            {token ? (
              <button
                onClick={logout}
                className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-2 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium shadow hover:scale-105 transition"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(true)}
              className="text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            // className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 p-6"
            className=" fixed inset-0 bg-black/90 backdrop-blur-xl z-50 p-6 bg-green-900"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="text-white text-3xl absolute top-4 right-6"
            >
              ✕
            </button>

            {/* Menu Items */}
            <div className="flex flex-col items-center mt-20 gap-8 text-white text-xl font-medium">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="hover:text-green-400 transition"
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink
                // key={item.path}on
                onClick={() => {
                  setOpen(false);
                  setPresentDash(!presentDash);
                }}
                to={presentDash ? "/Tdashboard" : "/dashboard"}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-green-400 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {navc}
              </NavLink>
              {/* Auth Button Mobile */}
              {token ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="px-6 py-2 mt-6 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                  className="px-7 py-2 mt-6 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow hover:scale-105 transition"
                >
                  Create Account
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
