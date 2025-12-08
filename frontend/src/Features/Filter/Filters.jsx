import Slider from "../../assests/settings-sliders.png"
import Search from "../../assests/search.png"

const Filters = ({ onFilterChange, searchTerm, setSearchTerm, currentFilter }) => {
    
    return (
        <>
            <div className="flex flex-wrap ml-[10%] gap-3 my-4 text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] ">
            
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md cursor-pointer w-fit">
                    <span>Filters</span>
                    <img src={Slider} alt="filter" className="w-4 h-4" />
                </div>
                
                <div className={`px-4 py-2 border border-gray-300 rounded-full hover:shadow-md cursor-pointer ${currentFilter === "veg" ? "bg-green-100" : ""}`} 
                    onClick={() => onFilterChange("veg")}> Pure Veg</div>
                
                <div className={`px-4 py-2 border border-gray-300 rounded-full hover:shadow-md cursor-pointer ${currentFilter === "non-veg" ? "bg-red-100" : ""}`}
                        onClick={() => onFilterChange("non-veg")}>Non-Veg</div>
                
                <div className={`px-4 py-2 border border-gray-300 rounded-full hover:shadow-md cursor-pointer ${currentFilter === "rating" ? "bg-yellow-100" : ""}`}
                        onClick={() => onFilterChange("rating")}> Rating 4.0+</div>

                <div className={`px-4 py-2 border border-gray-300 rounded-full hover:shadow-md cursor-pointer ${currentFilter === "maharashtrian" ? "bg-blue-100" : ""}`}
                        onClick={() => onFilterChange("maharashtrian")}> Maharashtrian</div>

                <div className="flex flex-row justify-between px-4 py-2 border md:w-[20%] border-gray-300 rounded-full hover:shadow-md cursor-pointer" >

                    <input type="text" placeholder="Search restaurant..." className="outline-none border-none" value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            onFilterChange(currentFilter);
                        }}/>
                    <img className="w-5 h-5" src={Search} alt="img" />
                </div>
            </div>

        </>
    )

}

export default Filters