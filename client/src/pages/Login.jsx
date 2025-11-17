// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import { useEffect } from "react";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await login(email, password);
//       if (res?.token) {
//         navigate("/dashboard");
//       } else {
//         setError(res?.message || "Login failed");
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           className="w-full p-2 border"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           className="w-full p-2 border"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {error && <div className="text-red-600">{error}</div>}
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//           type="submit"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useEffect, useState } from "react";
import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext.jsx";

// import axios from "axios";
// import { toast } from "react-toastify";
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
  // return (
  //   <form
  //     onSubmit={onSubmitHandler}
  //     className="min-h-[80vh]  mt-9 flex items-center "
  //   >
  //     {/* <div className="flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-zinc-600 text-sm shadow-lg"> */}
  //     <div className="flex flex-col gap-3 m-auto items-center p-8 w-full max-w-md border rounded-xl text-zinc-600 text-sm shadow-lg">
  //       <p className="text-2xl font-semibold">
  //         {state === "Sign Up" ? "Create Account" : "Login"}
  //       </p>
  //       <p>{state === "Sign Up" ? "sign-up" : "login"} to book appointment</p>
  //       {state === "Sign Up" && (
  //         <div className="w-full">
  //           <p>Full Name</p>
  //           <input
  //             className="border border-zinc-300 rounded w-full p-2 mt-1"
  //             type="text"
  //             onChange={(e) => setName(e.target.value)}
  //             value={name}
  //             name=""
  //             required
  //           />
  //         </div>
  //       )}
  //       <div className="w-full">
  //         <p>Email</p>
  //         <input
  //           className="border border-zinc-300 rounded w-full p-2 mt-1"
  //           type="text"
  //           onChange={(e) => setEmail(e.target.value)}
  //           value={email}
  //           name=""
  //           required
  //         />
  //       </div>
  //       <div className="w-full">
  //         <p>Password</p>
  //         <input
  //           className="border border-zinc-300 rounded w-full p-2 mt-1"
  //           type="text"
  //           onChange={(e) => setPassword(e.target.value)}
  //           value={password}
  //           name=""
  //           required
  //         />
  //       </div>
  //       <button
  //         type="submit"
  //         className="bg-indigo-500 w-full py-2 rounded-md text-base text-white cursor-pointer"
  //       >
  //         {state === "Sign Up" ? "Create Account" : "Login"}
  //       </button>
  //       {state === "Sign Up" ? (
  //         <p>
  //           Already have acount?{" "}
  //           <span
  //             onClick={() => setState("Login")}
  //             className="text-indigo-500 cursor-pointer underline"
  //           >
  //             Login here
  //           </span>
  //         </p>
  //       ) : (
  //         <p>
  //           Create a new account?{" "}
  //           <span
  //             onClick={() => setState("Sign Up")}
  //             className="text-indigo-500 cursor-pointer underline"
  //           >
  //             click here
  //           </span>
  //         </p>
  //       )}
  //     </div>
  //   </form>
  // );
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
