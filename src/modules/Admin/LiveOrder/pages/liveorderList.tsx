import { useEffect, useState } from "react";
import axios from "axios";
import { MdRestaurantMenu } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function LiveOrder() {
  const [orders, setOrders] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/api/transactions",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtered = res.data.data.filter(
        (item: any) => item.status === "pending" || item.status === "cooking",
      );

      setOrders(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ACCEPT ORDER
  const acceptOrder = async (id: number) => {
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:8000/api/transactions/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: "cooking",
        },
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // READY / SERVED
  const finishOrder = async (id: number) => {
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:8000/api/transactions/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: "served",
        },
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <MdRestaurantMenu className="text-4xl text-orange-500" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Live Kitchen Orders
          </h1>

          <p className="text-gray-500">Incoming customer orders</p>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-5 border-l-8 border-orange-500"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="font-bold text-xl text-gray-800">
                    Table Number 0{order.table_number}
                  </h1>

                  <p className="text-sm text-gray-500">{order.customer_name}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-3">
                {order.transaction_details?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.product.product_name}
                      </h2>

                      <p className="text-sm text-gray-500">Qty : {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ACTION */}
              <div className="mt-5">
                {order.status === "pending" ? (
                  <button
                    onClick={() => acceptOrder(order.id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
                  >
                    Accept Order
                  </button>
                ) : (
                  <button
                    onClick={() => finishOrder(order.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IoCheckmarkDoneCircle />
                    Ready To Serve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
          No active kitchen orders
        </div>
      )}
    </div>
  );
}
