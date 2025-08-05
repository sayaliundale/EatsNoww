import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const Restaurants = () => {

    const [restaurantData, setRestaurantData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentFilter, setCurrentFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/restaurant");
                console.log("rest-", response.data);
                setRestaurantData(response.data);
                setFilteredData(response.data);

            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        handleFilterChange(currentFilter);
    }, [searchTerm]);

    const handleFilterChange = (filterType) => {
        if (currentFilter === filterType) {
            setCurrentFilter("");
            let newData = [...restaurantData];

            if (searchTerm.trim() !== "") {
                newData = newData.filter((res) =>
                    res.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredData(newData);
            return;
        }

        setCurrentFilter(filterType);
        let newData = [...restaurantData];
        if (filterType === "veg") {
            newData = restaurantData.filter((res) => res.veg);
        }
        else if (filterType === "non-veg") {
            newData = restaurantData.filter((res) => !res.veg);
        }
        else if (filterType === "rating") {
            newData = restaurantData.filter((res) => res.rating >= 4)
        }
        else if (filterType === "maharashtrian") {
            newData = restaurantData.filter((res) => res.cusines.includes("Maharashtrian"));
        }

        if (searchTerm.trim() !== "") {
            newData = newData.filter((res) =>
                res.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredData(newData);
    };

    const handleClick = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (

        <>
            <Filters
                onFilterChange={handleFilterChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                currentFilter={currentFilter}
            />
            <div className="flex flex-wrap gap-10 justify-center" >
                {filteredData.map((item, index) => (
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
