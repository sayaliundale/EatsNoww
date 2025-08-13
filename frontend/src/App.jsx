import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from "./Pages/HomePage"
import Register from './Pages/Register'
import Login from "./Pages/Login"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import LayoutWithNav from "./utils/LayoutWithNav"
import RestaurantMenu from "./Restaurants/RestaurantMenu"
import Restaurants from "./Restaurants/Restaurants"
import Cart from "./Pages/Cart"
import AdminPanel from "./Pages/AdminPanel"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./Features/UserSlice"
import Order from "./Pages/Orders"

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
        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route element={<LayoutWithNav />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path = "/restaurants" element ={<Restaurants/>}/>
              <Route path ="/order" element ={<Order/>}/>
            </Route>
          </Route>

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/admin" element ={<AdminPanel/>}/>
          
        </Routes>
      </Router>

    </>
  )
}

export default App
