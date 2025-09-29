import Footer from "../Pages/HomePage/Footer";
import Navbar from "../Pages/HomePage/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutWithNav