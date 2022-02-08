import React, { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [saveUser, setSaveUser] = useState(null);

  useEffect(() => {
    setSaveUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <AuthContext.Provider value={{ saveUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
