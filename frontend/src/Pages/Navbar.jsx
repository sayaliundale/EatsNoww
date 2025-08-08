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

                <div className="flex items-center gap-4 mt-3 md:mt-0">
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

                    <button className="h-10 w-20 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
