import Navbar from "../Components/HomePage/Navbar";
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