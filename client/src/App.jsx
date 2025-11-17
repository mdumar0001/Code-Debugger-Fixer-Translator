import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./styles/globals.css";
import Layout from "./components/Layout";
import CodeTranslatorDashboard from "./pages/CodeTranslatorDashboard";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      {/* <Header /> */}
      {/* <main className="p-4"> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Tdashboard" element={<CodeTranslatorDashboard />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/my-profile" element={<MyProfile />} /> */}
        </Routes>
      </Layout>
      {/* </main> */}
    </div>
  );
};

export default App;
