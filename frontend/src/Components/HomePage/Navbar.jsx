import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { totalQuantity } from "../Features/CounterSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const quantity = useSelector(totalQuantity);

    const handleClick = () => {
        navigate("/cart");
    }
    return (
        <>
            <div className="shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between px-[10%] py-3">

                    <div className="flex flex-col w-[45%] md:flex-row items-center gap-8">
                        <img className="h-14 w-24" src="/Logo.png" alt="Logo" />
                        <ul className="flex flex-col w-[60%] mt-4 md:flex-row gap-8 text-[1.1rem] justify-center text-neutral-600 tracking-wide">
                            <Link to="/" className="cursor-pointer hover:underline"> Home</Link>
                            <li className="cursor-pointer hover:underline">About us</li>
                            <li className="cursor-pointer hover:underline">Contact us</li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4 mt-3 md:mt-0">
                        <div className="flex flex-col ">
                            <img className="h-10 cursor-pointer" src="/paper-bag.png" alt="Cart" onClick={handleClick} />
                            <span className="absolute h-6 w-6 text-center rounded-full bg-lime-400">{quantity} </span>
                        </div>
                    
                        <button className="h-10 w-20 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Navbar