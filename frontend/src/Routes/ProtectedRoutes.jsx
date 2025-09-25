import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        axios.post("http://localhost:3000/verify", {}, { withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => {
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

    return <Navigate to="/login" />;
};

export default ProtectedRoutes;
