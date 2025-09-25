import React from "react";

const RestaurantCard = (props) => {

    const { restaurant, onClick } = props;
    const { res_img, cusines, name, rating, del_time } = restaurant;

    return (
        <div className="w-[60%] sm:w-[40%] md:w-[25%] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-gray-800 p-4 bg-white" onClick={onClick}>
            <img src={res_img} alt={name} className="w-full h-48 object-cover rounded-lg"/>

            <div className="mt-3 space-y-1">
                <h2 className="text-[1.05rem] lg:text-xl font-semibold">{name}</h2>
                <div className="mt-2 flex items-center gap-2 text-[0.9rem] md:text-[1.05rem] text-gray-600">
                    <span className="bg-green-100  text-green-700 px-2 py-0.5 rounded-full font-medium">
                    ⭐ {rating} </span>
                    <span>• {del_time} mins</span>
                </div>

          <p className="mt-2.5 text-gray-700 text-[0.8rem] md:text-[1.05rem] ">{cusines}</p>
        
      </div>
    </div>
  );
};

export default RestaurantCard;
