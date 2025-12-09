import { useEffect, useState, useMemo, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import Filters from "../Features/Filter/Filters";
import RestaurantShimmer from "./Shimmer/RestaurantShimmer";
import { setRestaurants } from "../Features/RestaurantSlice";

const RestaurantCard = lazy(() => import("./RestaurantCard"));

const Restaurants = () => {

    const restaurantData = useSelector(state => state.restaurant?.data || []);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentFilter, setCurrentFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        if (restaurantData.length > 0) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/restaurant`);
                dispatch(setRestaurants(response.data));
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [restaurantData, dispatch]);

    const filteredData = useMemo(() => {
        let data = restaurantData;

        if (currentFilter === "veg") {
            data = data.filter(res => res.veg);
        } else if (currentFilter === "non-veg") {
            data = data.filter(res => !res.veg);
        } else if (currentFilter === "rating") {
            data = data.filter(res => res.rating >= 4);
        } else if (currentFilter === "maharashtrian") {
            data = data.filter(res => res.cusines?.includes("Maharashtrian"));
        }

        if (searchTerm.trim() !== "") {
            data = data.filter(res =>
                res.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return data;
    }, [restaurantData, currentFilter, searchTerm]);

    const handleFilterChange = (filterType) => {
        setCurrentFilter(prev => (prev === filterType ? "all" : filterType));
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
                currentFilter={currentFilter}/>
                
            <div className="flex flex-wrap gap-10 justify-center">
            <Suspense fallback={<div>Loading...</div>}></Suspense>
                {loading
                    ? Array.from({ length: 9 }).map((_, i) => <RestaurantShimmer key={i} />)
                    : filteredData.map((item) => (
                        <RestaurantCard
                            key={item.res_id}
                            restaurant={item}
                            onClick={() => handleClick(item.res_id)}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default Restaurants;
