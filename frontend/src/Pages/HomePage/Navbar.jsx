import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { totalQuantity, setCart } from "../../Features/Counter/CounterSlice";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState, useMemo, lazy } from "react";
import { logoutUser } from "../../Features/UserSlice";
import { toast } from 'react-toastify';
import Bag from "../../assests/paper-bag.png"
import BurgarBar from "../../assests/burger-bar.png"
import Logo from "../../assests/Logo.png"
import User from "../../assests/user.png"

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quantity = useSelector(totalQuantity);
    const [isOpen, setOpen] = useState(false);

    const user = useMemo(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    }, []);


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(`${API_URL}/getCart`, {
                    withCredentials: true,
                });

                if (Array.isArray(res.data.cart)) {
                    const cartObject = {};
                    res.data.cart.forEach((item) => {
                        cartObject[item.id] = {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            img: item.img,
                            quantity: item.quantity
                        };
                    });
                    dispatch(setCart(cartObject));
                }
            } catch (err) {
                console.error("Error fetching cart in Navbar:", err);
            }
        };

        fetchCart();
    }, [dispatch]);

    const handleToggle = () => {
        setOpen(!isOpen);
    }

    const handleClick = () => {
        navigate("/cart");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged out sucessful!", {position : "top-center"});
        navigate("/login");
    }

    return (
        <div className="relative shadow-md">
            <div className="flex justify-between items-center md:px-[10%] py-3 px-4 gap-3 md:gap-6">

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img className="h-5 w-6 mt-5 sm:hidden cursor-pointer" src={BurgarBar}
                            alt="menu" onClick={handleToggle} loading="lazy" />
                        <img className="h-10 w-22 md:h-14 md:25" src={Logo} alt="Logo" loading="lazy" />
                    </div>

                    {isOpen &&
                        <div className="absolute top-full left-0 w-full bg-white shadow-md sm:hidden">
                            <ul className="flex flex-col gap-6 px-6 py-4 text-[1.1rem] text-neutral-600 tracking-wide">
                                <Link to="/" className="cursor-pointer hover:underline">Home</Link>
                                <li className="cursor-pointer hover:underline">About us</li>
                                <li className="cursor-pointer hover:underline">Contact us</li>
                            </ul>
                        </div>}

                    <ul className="hidden sm:flex mt-4 gap-8 text-[1.1rem] justify-center text-neutral-600 tracking-wide">
                        <Link to="/" className="cursor-pointer hover:underline">Home</Link>
                        <li className="cursor-pointer hover:underline">About us</li>
                        <li className="cursor-pointer hover:underline">Contact us</li>
                    </ul>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <img className="h-8 sm:h-11 cursor-pointer" src={Bag} alt="Cart" onClick={handleClick} loading="lazy"/>
                            
                        <span className="absolute -top-2 -right-2 h-5 w-5 text-[0.8rem] sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-lime-400 text-black font-semibold">
                            {quantity}
                        </span>
                    </div>

                    <div className="relative group flex gap-2 items-center mt-2 text-neutral-600 tracking-wide text-[1.1rem]">
                        <img className="w-6 sm:w-8" src={User} alt="user" loading="lazy" />
                        <p className="text-[1rem] xl:text-[1.1rem] ">{user.name}</p>

                        <div className="absolute hidden group-hover:block bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded mt-10 w-40 z-50">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => navigate("/order")} > Orders </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleLogout}> Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
