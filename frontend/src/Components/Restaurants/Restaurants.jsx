import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {

    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/restaurant");
                console.log("rest-", response.data);
                setRestaurantData(response.data);
                

            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (id) => {
        navigate(`/restaurant/${id}`);
      };

    return (
        <>
            <div className="flex flex-wrap gap-10 justify-center" >
                {restaurantData.map((item, index) => (
                    <RestaurantCard
                        key={item.res_id} 
                        restaurant={item}
                        onClick={() => handleClick(item.res_id)} 
                    />
                    ))}
            </div>
        </>
    );
};

export default Restaurants;
