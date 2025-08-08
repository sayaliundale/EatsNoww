import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutWithNav