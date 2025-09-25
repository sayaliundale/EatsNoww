import Counter from "../Features/Counter/Counter";
import { useSelector } from "react-redux";

const MenuCard = ({ data }) => {
    const userId = useSelector((state) => state.user._id);
    const cart = useSelector((state) => state.counter.value);

    return (
        <div className="flex flex-col gap-6">
            {data?.itemcards?.map((item, index) => {
                const card = item?.card;
                const cartItem = cart[card?.id] || {}; 
                const mergedItem = {
                    ...card,
                    quantity: cartItem.quantity || 0};

                return (
                    <div key={index}
                        className="flex justify-between items-start gap-4 py-4 border-b border-gray-300 md:px-10">
                        <div className=" w-[80%] md:w-[70%]">
                            <p className="text-lg font-semibold text-gray-900">{card?.name}</p>
                            {card?.description && (
                                <p className="text-[0.8rem] md:text-[1rem] text-gray-600 mt-1">{card?.description}</p>
                            )}
                            <p className="mt-2 font-semibold text-gray-800 text-[0.9rem] md:text-[1rem]">Rs. {card?.price}</p>
                        </div>

                        <div className="relative w-[8rem] h-[5rem] md:w-[10rem] md:h-[7rem] rounded-lg mb-4">
                            {card?.img && (
                                <img src={card.img} alt={card.name} className="w-full h-full object-cover rounded-md"/>)}

                            {card?.id && (
                                <div className="absolute top-[85%] ml-[10%] w-[75%] h-[45%] md:w-[60%] md:ml-[20%] md:h-[35%] lg:top-[80%] 
                                    text-center py-2 text-lime-500 bg-white rounded-md border font-semibold border-gray-300 shadow-md">
                                    <Counter id={card.id} itemData={mergedItem} userId={userId} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MenuCard;
