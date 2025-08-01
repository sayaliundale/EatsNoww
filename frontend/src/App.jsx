import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import HomePage from './Components/HomePage/HomePage'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ProtectedRoutes from "./utils/ProtectedRoutes"

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          

        </Routes>
      </Router>

    </>
  )
}

export default App
