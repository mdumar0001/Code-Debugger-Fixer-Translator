import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import "./styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react"; // <-- ADD THIS

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        {" "}
        {/* <-- WRAP HERE */}
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
