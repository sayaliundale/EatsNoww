import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { totalQuantity, setCart } from "../Features/Counter/CounterSlice";
import axios from "axios";
import { useEffect } from "react";
import { logoutUser } from "../Features/UserSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quantity = useSelector(totalQuantity);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Localstorage - ", user);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get("http://localhost:3000/getCart", {
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

    const handleClick = () => {
        navigate("/cart");
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");

    }

    return (
        <div className="shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between px-[10%] py-3">
                <div className="flex flex-col w-[45%] md:flex-row items-center gap-8">
                    <img className="h-14 w-24" src="/Logo.png" alt="Logo" />

                    <ul className="flex flex-col w-[60%] mt-4 md:flex-row gap-8 text-[1.1rem] justify-center text-neutral-600 tracking-wide">
                        <Link to="/" className="cursor-pointer hover:underline"> Home</Link>
                        <li className="cursor-pointer hover:underline">About us</li>
                        <li className="cursor-pointer hover:underline">Contact us</li>
                    </ul>
                </div>

                <div className="flex items-center gap-8 mt-3 md:mt-0">
                    <div className="flex flex-col relative">
                        <img
                            className="h-10 cursor-pointer"
                            src="/paper-bag.png"
                            alt="Cart"
                            onClick={handleClick}
                        />
                        <span className="absolute -top-2 -right-2 h-6 w-6 text-center rounded-full bg-lime-400 text-black font-semibold">
                            {quantity}
                        </span>
                    </div>

                    <div className="relative group flex gap-2 items-center text-neutral-600 tracking-wide text-[1.1rem] mt-2">
                        <img className="w-8" src="/user.png" alt="user" />
                        <p className="">{user.name}</p>

                        <div className="absolute hidden group-hover:block bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded mt-30 w-40 z-50">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=> navigate("/order")}>Orders</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
