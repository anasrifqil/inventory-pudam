// // AuthContext.js
// import React, { createContext, useContext, useReducer } from 'react';

// // Definisi tipe aksi
// const AuthActionTypes = {
//   LOGIN: 'LOGIN',
//   LOGOUT: 'LOGOUT',
// };

// // Fungsi Reducer
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case AuthActionTypes.LOGIN:
//       return { ...state, isAuthenticated: true };
//     case AuthActionTypes.LOGOUT:
//       return { ...state, isAuthenticated: false };
//     default:
//       return state;
//   }
// };

// // Membuat konteks autentikasi
// const AuthContext = createContext();

// // Fungsi penyedia konteks
// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false });

//   const login = () => dispatch({ type: AuthActionTypes.LOGIN });
//   const logout = () => dispatch({ type: AuthActionTypes.LOGOUT });

//   return (
//     <AuthContext.Provider value={{ state, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Fungsi untuk menggunakan konteks
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export { AuthProvider, useAuth };
