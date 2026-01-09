import { useNavigate } from "react-router-dom"
import FoodDelivery from "../../assests/Food_Delivery.png"
import { LazyLoadImage } from "react-lazy-load-image-component";

const Hero = () => {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/restaurants")
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="w-[90%] h-[75%] m-[3%] bg-amber-100 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-center px-12 py-16 gap-8 lg:gap-8">

                        <div className="text-gray-800 max-w-xl space-y-4 font-extralight">
                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                                Life's too short
                            </p>
                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  tracking-tight">
                                to cook, <span className="text-orange-500 ">let's eat!</span>
                            </p>
                            <p className="text-[1rem] sm:text-[1.1rem] md:text-xl text-gray-600 font-light">
                                Order now and conquer your cravings
                            </p>

                            <button className="mt-4 px-4 py-2 text-sm bg-orange-500 text-white rounded 
                            sm:px-6 sm:py-2 sm:text-base" onClick ={handleClick}>
                                Order Now
                            </button>
                          
                        </div>

                        <div className="mt-6 md:mt-0 md:ml-10">
                            <LazyLoadImage src={FoodDelivery}  alt="Food delivery" />     
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Hero