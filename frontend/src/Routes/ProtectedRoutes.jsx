import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("API_URL : ", API_URL);

    useEffect(() => {
        console.log("Calling verify API...");
        axios.post(`${API_URL}/verify`, {}, { withCredentials: true })
          .then((res) => {
            console.log("Verify success", res.data);
            setIsAuthenticated(true);
          })
          .catch((err) => {
            console.error("Verify failed:", err.response || err.message);
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          });
      }, []);
      

    if (isAuthenticated === null) {
        return <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>; 
    }

    if (isAuthenticated && user.role === "user") {
        return <Outlet />;
    }

    return <Navigate to="/login" replace/>;
};

export default ProtectedRoutes;
