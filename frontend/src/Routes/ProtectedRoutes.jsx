import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .post("http://localhost:3000/verify", {}, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated && user.role==="user") {
    return <Outlet />; 
  } else {
    return <Navigate to="/login" />; 
  }
};

export default ProtectedRoutes;
