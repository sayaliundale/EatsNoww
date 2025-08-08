const Hero = () => {

    return (
        <>
            <div className="">
                <div className="w-[94%] h-[75%] m-[3%] bg-amber-100 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-around px-12 py-16 gap-10 lg:gap-10">

                        <div className="text-gray-800 max-w-xl space-y-4 font-extralight">
                            <p className="text-5xl lg:text-6xl tracking-tight">
                                Life's too short
                            </p>
                            <p className="text-5xl lg:text-6xl  tracking-tight">
                                to cook, <span className="text-orange-500 ">let's eat!</span>
                            </p>
                            <p className="text-xl text-gray-600 font-light">
                                Order now and conquer your cravings
                            </p>

                            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                                Order Now
                            </button>
                          
                        </div>

                        <div className="mt-6 md:mt-0 md:ml-10">
                            <img
                                src="/Food_Delivery.png"
                                alt="Food delivery" 
                            />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default Hero