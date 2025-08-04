import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from './Components/HomePage/HomePage'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ProtectedRoutes from "./utils/ProtectedRoutes"
import LayoutWithNav from "./utils/LayoutWithNav"
import RestaurantMenu from "./Components/Restaurants/RestaurantMenu"
import Cart from "./Components/HomePage/Cart"
// import { useDispatch } from "react-redux";
// import { setUser } from "./Components/Features/UserSlice";
// import { useEffect } from "react";

function App() {
  //const dispatch = useDispatch();

 

  return (
    <>
      <Router>
        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route element={<LayoutWithNav />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart/>}/>
            </Route>
          </Route>

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
        
        </Routes>
      </Router>

    </>
  )
}

export default App
