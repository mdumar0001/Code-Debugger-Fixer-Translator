import React, { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
// import { toast } from "react-toastify";
export const AuthContext = createContext();
// import axios from "axios";
const AuthContextProvider = (props) => {
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const backendUrl =
    "https://code-debugger-fixer-translator-2-backend.onrender.com";

  // localStorage.removeItem("token");
  const [presentDash, setPresentDash] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const value = {
    token,
    setToken,
    backendUrl,

    presentDash,
    setPresentDash,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
