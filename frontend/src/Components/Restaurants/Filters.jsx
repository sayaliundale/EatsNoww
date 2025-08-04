
const Filters = () => {
    return (
        <>
            <div className="flex flex-wrap ml-[10%] gap-3 my-4">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer w-fit">
                    <span>Filters</span>
                    <img src="/settings-sliders.png" alt="filter" className="w-4 h-4" />
                </div>

                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer">Pure Veg </div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer">Non-Veg</div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer">Rating 4.0+</div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer">Maharshtraian</div>
                <div className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:shadow-md cursor-pointer">Chinese</div>
            </div>

        </>
    )

}

export default Filters