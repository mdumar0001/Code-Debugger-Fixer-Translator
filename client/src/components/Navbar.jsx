// import React, { useContext, useState } from "react";
// // import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// // import { AuthContext } from "./context/AuthContext.jsx";
// import { AuthContext } from "../contexts/AuthContext.jsx";
// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const { token, setToken } = useContext(AuthContext);
//   //token true mean use logged in so we will not show the create account button

//   const logout = () => {
//     setToken(false);
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className=" flex justify-between mx-5 items-center text-sm py-2 mb-5 border-b border-b-gray-400">
//       {/* <img
//         onClick={() => navigate("/")}
//         className="w-44 cursor-pointer"
//         src={assets.logo}
//       /> */}
//       <ul className="hidden  md:flex items-start gap-5 font-medium">
//         <NavLink to="/">
//           <li className="py-1">HOME</li>
//           <hr className=" border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
//         </NavLink>

//         <NavLink to="/about">
//           {/* onclicking these navlink a active class will be added so we use it to style the actiavted link */}
//           <li className="py-1">ABOUT</li>
//           <hr className=" border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
//         </NavLink>
//         {/* <NavLink to="/contact">
//           <li className="py-1">CONTACT</li>
//           <hr className=" border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
//         </NavLink> */}
//       </ul>
//       {/* <button
//         onClick={
//           () =>
//             window.open(`${import.meta.env.VITE_ADMIN_DOCTOR_PANEL}`, "_blank")
//           //VITE_likhna padta hai pahle environent variable banane se pahle
//         }
//         className="px-1 py-2 rounded-lg text-sm bg-gray-500 text-white hover:bg-green-800 active:translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 shadow"
//       >
//         Admin & Doctor Panel
//       </button> */}
//       <div className="flex items-center gap-4">
//         {token ? (
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <p
//               onClick={() => logout()}
//               className="hover:text-black cursor-pointer"
//             >
//               Logout
//             </p>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             className="border rounded-full bg-indigo-500 px-8 py-3 text-white font-light hidden md:block"
//           >
//             Create account
//           </button>
//         )}

//         {/* ----------------MOBILE MENU--------------------- */}
//         {/* <div
//           className={`${
//             showMenu ? "fixed w-full" : "h-0 w-0"
//           } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
//         >
//           <div className="flex items-center justify-between px-5 py-6">
//             <img className="w-36" src={assets.logo} alt="" />
//             <img
//               className="w-7"
//               onClick={() => setShowMenu(false)}
//               src={assets.cross_icon}
//               alt=""
//             />
//           </div>
//           <ul className="flex flex-col gap-2 items-center mt-5 px-5 text-lg font-medium">
//             {/* color is set in index.csss on actie link */}
//         {/* <NavLink onClick={() => setShowMenu(false)} to={"/"}>
//               <p className="px-4 py-2 rounded inline-block">HOME</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
//               <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
//               <p className="px-4 py-2 rounded inline-block">ABOUT</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
//               <p className="px-4 py-2 rounded inline-block">CONTACT</p>
//             </NavLink>
//           </ul>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
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
            AI Code Debugger & Fixer
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
