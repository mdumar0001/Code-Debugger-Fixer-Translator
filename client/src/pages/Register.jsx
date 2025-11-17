// import React, { useState, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//     const { register } = useContext(AuthContext);
//     const history = useHistory();
//     const { username, email, password } = formData;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await register(username, email, password);
//             history.push('/dashboard');
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-md w-96">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={username}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={password}
//                             onChange={handleChange}
//                             required
//                             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(username, email, password);
      // check backend success shape
      if (res?.success || res?.token || res?.message === "User created") {
        // if created and login not automatic, go to login
        // navigate("/login");
        navigate("/dashboard");
      } else {
        setError(res?.message || "Registration failed");
      }
    } catch (err) {
      setError(err?.message || "Registration error");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
