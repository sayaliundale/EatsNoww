
const MenuShimmer = () => {
    return (
        <>
            <div className="bg-gry-300 h-[9rem] border-gray-400 border-b-1 animate-pulse mt-[3rem]">
                <div className="flex flex-wrap justify-between">
                    <div className="flex flex-col w-[60%] gap-[1rem] ">
                        <div className="bg-gray-300 w-[30%] h-[50%] rounded-xl" />
                        <div className ="bg-gray-300 w-full h-full rounded-xl"/>
                    </div>
                    <div className="bg-gray-300 w-[20%] h-[6rem] rounded-xl" />
                </div>
            </div>

        </>
    )
}

export default MenuShimmer;