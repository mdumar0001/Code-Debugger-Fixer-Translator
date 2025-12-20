import React, { useEffect, useState } from "react";
import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext.jsx";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const { backendUrl, token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          password,
          email,
        });
        console.log(data);
        if (data.success) {
          console.log(data);
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          // console.log(localStorage.getItem("token"));
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //if logim in successfully then no need to show login page
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-bar bg-white froam-blue-700 viaa-blue tao-blue-250"
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 animate-fadeIn text-white">
        {/* Title */}
        <p className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-900 to-pink-400 bg-clip-text text-transparent">
          {state === "Sign Up" ? "Create Your Account" : "Welcome Back"}
        </p>

        <p className="text-center text-green-700 mt-1 mb-6 text-sm">
          {state === "Sign Up"
            ? "Sign up to start using AI Code Debugger"
            : "Login to continue debugging your code"}
        </p>

        <div className="flex flex-col gap-4">
          {/* Full Name (Signup Visible Only) */}
          {state === "Sign Up" && (
            <div>
              <label className="text-md text-gray-900">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-green-400 outline-none text-blue-500 placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-md text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-green-400 outline-none text-blue-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-md text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:border-green-400 outline-none text-blue-500 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:scale-[1.02] shadow-lg transition font-semibold"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {/* Toggle */}
          <p className="text-center mt-2 text-gray-300">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-green-400 cursor-pointer hover:underline"
                  onClick={() => setState("Login")}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Create a new account?{" "}
                <span
                  className="text-green-400 cursor-pointer hover:underline"
                  onClick={() => setState("Sign Up")}
                >
                  Click here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
