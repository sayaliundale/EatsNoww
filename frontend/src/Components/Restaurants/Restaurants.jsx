import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";

const Restaurants = () => {
    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/restaurant");
                console.log(response.data);
                setRestaurantData(response.data);
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex flex-wrap gap-10 justify-center">
                {restaurantData.map((item, index) => (
                    <RestaurantCard key={index} restaurant={item} />
                ))}
            </div>
        </>
    );
};

export default Restaurants;
