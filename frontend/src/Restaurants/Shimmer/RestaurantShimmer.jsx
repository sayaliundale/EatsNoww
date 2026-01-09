
const RestaurantShimmer = () => {
    return (
        <>
            <div className="w-[60%] h-[15rem] sm:w-[40%] md:w-[25%] rounded-xl overflow-hidden border-1 border-gray-300 p-4 animate-pulse">
                <div className="h-[60%] bg-gray-300 rounded-2xl"/> 
                <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"/>
                    <div className="h-4 bg-gray-200 rounded w-2/3"/>
                </div>

            </div>
        </>
    )
}

export default RestaurantShimmer;