import { useEffect } from "react";

const Filters = ({ onFilterChange, searchTerm, setSearchTerm, currentFilter }) => {
   

    return (
        <>
            <div className="flex flex-wrap ml-[10%] gap-3 my-4">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer w-fit">
                    <span>Filters</span>
                    <img src="/settings-sliders.png" alt="filter" className="w-4 h-4" />
                </div>

                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer" onClick={() => onFilterChange("veg")}>Pure Veg </div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer" onClick={() => onFilterChange("non-veg")}>Non-Veg</div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer" onClick={() => onFilterChange("rating")}>Rating 4.0+</div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer" onClick={() => onFilterChange("maharashtrian")}>Maharashtrian</div>
                <div className="flex justify-between gap-2 px-4 py-2 border w-[20%] border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer" >

                    <input
                        type="text"
                        placeholder="Search restaurant..."
                        className="outline-none border-none"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            onFilterChange(currentFilter);
                        }}
                    />
                    <img className="w-5 h-5" src="/search.png" alt="img" />
                </div>
            </div>

        </>
    )

}

export default Filters