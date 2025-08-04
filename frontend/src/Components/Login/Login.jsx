import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../Features/UserSlice";
import { useDispatch } from "react-redux";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login",
        formData,
        {
          withCredentials: true
        }
      );
      
      dispatch(setUser(res.data.user));
      console.log("Login response:", res.data)
      navigate("/")
      alert("Login successful!");
    }
    catch (err) {
      alert("Login Failed!")
      console.log(err);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 cursor-pointer hover:underline">Register</Link>
        </p>

        <div className="mt-6 text-sm text-center text-gray-600 bg-orange-100 p-3 rounded-md shadow-sm">
          <p className="font-medium text-orange-700">
            Test Credentials:
          </p>
          <p>Email: <span className="font-mono">test@gmail.com</span></p>
          <p>Password: <span className="font-mono">123456</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
