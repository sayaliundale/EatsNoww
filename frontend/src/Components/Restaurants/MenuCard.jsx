import Counter from "../Features/Counter";
import { useSelector } from "react-redux";


const MenuCard = ({ data }) => {

    const userId = useSelector((state) => state.user._id);
    console.log("Current userId:", userId);

    return (
        <>
        
            <div className="flex flex-col gap-6">
                {data?.itemcards?.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-start gap-4 px-10 py-4 border-b border-gray-300" >

                        <div className="w-[70%]">
                            <p className="text-lg font-semibold text-gray-900">{item?.card?.name}</p>
                            {item?.card?.description && (
                                <p className="text-[0.9rem] text-gray-600 mt-1">{item?.card?.description}</p>
                            )}
                            <p className="mt-2 font-semibold text-gray-800">Rs. {item?.card?.price}</p>
                        </div>

                        <div className="relative w-[10rem] h-[7rem] rounded-lg mb-4">
                            {item?.card?.img && (
                                <img
                                    src={item.card.img}
                                    alt={item.card.name}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            )}

                            {item?.card?.id && (
                                <div className="absolute top-[80%] ml-[20%] w-[60%] h-[35%] text-center py-2  text-lime-500 bg-white rounded-md border font-semibold border-gray-300 shadow-md">
                                    <Counter id={item.card.id} itemData={item.card} userId={userId} />
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default MenuCard;