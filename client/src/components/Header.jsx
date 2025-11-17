// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <NavLink to="/" className="font-bold text-lg">
//           AI Code Tool
//         </NavLink>
//         <nav className="space-x-4">
//           <NavLink to="/" className="hover:underline">
//             Home
//           </NavLink>
//           {user ? (
//             <>
//               <NavLink to="/dashboard" className="hover:underline">
//                 Dashboard
//               </NavLink>
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 bg-red-600 px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <NavLink to="/login" className="hover:underline">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="hover:underline">
//                 Register
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

const Header = () => {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded hover:bg-gray-700 transition ${
      isActive ? "bg-gray-700 font-semibold" : ""
    }`;

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <NavLink
          to="/"
          aria-label="AI Code Tool Home"
          className="text-xl font-bold tracking-wide"
        >
          AI Code Tool
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          {/* {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="ml-3 px-3 py-2 rounded bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <> */}
          <NavLink to="/login" className={navLinkClasses}>
            Login
          </NavLink>

          <NavLink to="/register" className={navLinkClasses}>
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
