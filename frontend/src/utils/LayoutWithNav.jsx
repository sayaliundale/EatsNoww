import Footer from "../Pages/Footer";
import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default LayoutWithNav