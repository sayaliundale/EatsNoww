import { useParams } from "react-router-dom"
import MenuCard from "./MenuCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id);

    const [restaurtInfo, setRestaurantInfo] = useState([]);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/restaurant/${id}`);
                const { categories, ...rest } = response.data;
    
                setMenu(categories);
                setRestaurantInfo(rest);
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };
    
        fetchMenu();
    }, [id]);
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:3000/getCart");
    
                const cartItems = response.data.cart;
                if (Array.isArray(cartItems)) {
                    const allMenuItems = menu.flatMap(category => category.items);
    
                    
                }
            } catch (error) {
                console.error("Error fetching cart:", error.response?.data || error.message);
            }
        };
    
        if (menu.length > 0) fetchCart();
    }, [menu]);
    
    const { name, del_time, rating, cusines, veg } = restaurtInfo;

    return (
        <>
            <div className="flex flex-col items-center ">
                <div className="w-[55%] mt-[5%]">
                    <p className="text-3xl font-bold">{name}</p>
                    <div className="flex flex-col gap-2 mt-4 border-[2px] border-gray-300 rounded-2xl px-8 py-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]">

                        <div className="flex flex-wrap gap-2 text-gray-700 ">⭐ {rating} ratings

                            <img
                                src={veg ? "/veg.png" : "/non-veg.png"}
                                alt={veg ? "Veg" : "Non-Veg"}
                                className="w-4 h-4 mt-[3px] ml-6" />

                            <span className="">{veg ? "Veg" : "Non-Veg"}</span>
                        </div>
                        <p className="text-gray-700 ">🕒  {del_time}</p>
                        <p className="text-gray-700 ">🍽️  {cusines}</p>
                    </div>
                    <div className="mt-8">
                        <MenuCard data={menu} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantMenu