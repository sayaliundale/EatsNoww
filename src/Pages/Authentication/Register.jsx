import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", email: "", password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/signup`, formData, { withCredentials: true });
            toast.success("User registered!", { position: "top-center" });
            navigate("/login");
        }
        catch (err) {
            toast.error("Signup Failed!", { position: "top-center" });
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
         <ToastContainer />
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                    </div>

                    <button type="submit"
                        className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                        Register </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-orange-500 cursor-pointer hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
