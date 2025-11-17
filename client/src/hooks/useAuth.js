// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import api from '../services/api';

// const useAuth = () => {
//     const { user, setUser } = useContext(AuthContext);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await api.get('/auth/me');
//                 setUser(response.data);
//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, [setUser]);

//     const login = async (credentials) => {
//         try {
//             const response = await api.post('/auth/login', credentials);
//             setUser(response.data);
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const register = async (userData) => {
//         try {
//             const response = await api.post('/auth/register', userData);
//             setUser(response.data);
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const logout = async () => {
//         try {
//             await api.post('/auth/logout');
//             setUser(null);
//         } catch (err) {
//             setError(err);
//         }
//     };

//     return {
//         user,
//         loading,
//         error,
//         login,
//         register,
//         logout,
//     };
// };

// export default useAuth;
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// export const useAuth = () => useContext(AuthContext);

// export default useAuth;
