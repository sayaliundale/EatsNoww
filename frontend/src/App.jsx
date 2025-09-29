import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import './App.css'
import HomePage from "./Pages/HomePage/HomePage"
import Register from './Pages/Authentication/Register'
import Login from "./Pages/Authentication/Login"
import ProtectedRoutes from "./Routes/ProtectedRoutes"
import LayoutWithNav from "./utils/LayoutWithNav"
import RestaurantMenu from "./Restaurants/RestaurantMenu"
import Restaurants from "./Restaurants/Restaurants"
import Cart from "./Pages/Cart"
import AdminPanel from "./Pages/AdminPanel"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Features/UserSlice"
import Order from "./Pages/Order/Orders"
import AdminRoute from "./Routes/AdminRoute"
import ErrorPage from "./Pages/Error"
import PaymentPage from "./Pages/PaymentPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, []);

  return (

    <>
      <Router>
        <ToastContainer className=""/>
        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route element={<LayoutWithNav />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/order" element={<Order />} />
              <Route path="/payment" element={<PaymentPage/>}/>
            </Route>
          </Route>

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

        </Routes>
      </Router>

    </>
  )
}

export default App
