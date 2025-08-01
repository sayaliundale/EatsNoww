
const Navbar = () => {
    return (
        <>
            <div className="shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between px-12 py-3">

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img className="h-14 w-24 " src="/Logo.png" alt="Logo" />
                        <ul className="flex flex-col md:flex-row gap-4 text-[1.1rem] text-neutral-600 tracking-[1px] ">
                            <li className="cursor-pointer hover:underline">Home</li>
                            <li className="cursor-pointer hover:underline">About us</li>
                            <li className="cursor-pointer hover:underline">Contact us</li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4 mt-3 md:mt-0">
                        <img className="h-12 cursor-pointer" src="/paper-bag.png" alt="Cart" />
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