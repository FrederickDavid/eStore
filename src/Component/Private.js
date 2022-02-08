import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Private = ({ children }) => {
  const { saveUser } = useContext(AuthContext);

  return <div>{saveUser ? children : <Navigate to="/" />}</div>;
};

export default Private;
