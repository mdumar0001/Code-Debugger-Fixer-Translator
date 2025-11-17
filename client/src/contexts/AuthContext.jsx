// import React, { createContext, useState, useEffect } from "react";
// import {
//   setAuthToken,
//   getUser,
//   loginUser,
//   registerUser,
// } from "../services/api";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(
//     () => localStorage.getItem("token") || null
//   );
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       if (token) {
//         try {
//           setAuthToken(token);
//           const data = await getUser();
//           setUser(data?.user ?? data ?? null);
//         } catch (err) {
//           console.warn("Auth init failed:", err?.message || err);
//           localStorage.removeItem("token");
//           setToken(null);
//           setUser(null);
//           setAuthToken(null);
//         }
//       } else {
//         setAuthToken(null);
//         setUser(null);
//       }
//       setLoading(false);
//     };
//     initialize();
//   }, [token]);

//   const register = async (username, email, password) => {
//     return await registerUser(username, email, password);
//   };

//   const login = async (email, password) => {
//     const res = await loginUser(email, password);
//     if (res?.token) {
//       localStorage.setItem("token", res.token);
//       setToken(res.token);
//       setUser(res.user ?? null);
//       setAuthToken(res.token);
//     }
//     return res;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     setAuthToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={value}>{props.children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
// import { toast } from "react-toastify";
export const AuthContext = createContext();
// import axios from "axios";
const AuthContextProvider = (props) => {
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl = "http://localhost:5000";

  // localStorage.removeItem("token");
  const [presentDash, setPresentDash] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  // const [userData, setUserData] = useState(false);

  // const loadUserProfileData = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
  //       headers: { token },
  //     });
  //     if (data.success) {
  //       setUserData(data.userData);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     loadUserProfileData();
  //   } else {
  //     //if user logged out
  //     setUserData(false);
  //   }
  // }, [token]);

  const value = {
    token,
    setToken,
    backendUrl,
    // userData,
    // setUserData,
    // loadUserProfileData,p
    presentDash,
    setPresentDash,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
