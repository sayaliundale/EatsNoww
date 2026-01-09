import { Outlet } from "react-router-dom";

const AdminRoute = () => {

    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || user.role !== "admin") {
        return <div>You cannot access this page.</div>; 
    }

    return <Outlet />;
};

export default AdminRoute;
