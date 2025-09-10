
const Order = ({order}) => {
    return (
        <>
            <div key={order._id}
                className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-xl transition-all duration-200">

                <div className="flex justify-between items-center mb-4">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Out of Delivery"
                                ? "bg-yellow-100 text-yellow-700" 
                                : "bg-gray-100 text-gray-700"
                            }`}>
                        {order.status}
                    </span>
                    <span className="text-sm text-gray-500">
                        Order ID: {order._id}
                    </span>
                </div>

                <div className="space-y-2">
                    {order.items?.map((it, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <span className="text-gray-800 font-medium">{it.name}</span>
                            <span className="text-gray-600">
                                {it.quantity} × ₹{it.price}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-3 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total Price</span>
                    <span className="text-lg font-bold text-green-600">
                        ₹{order.totalPrice}
                    </span>
                </div>
            </div>

        </>
    )
}

export default Order;