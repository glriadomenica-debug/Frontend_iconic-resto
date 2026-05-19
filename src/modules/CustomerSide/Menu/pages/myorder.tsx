import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  

  const getCustomerToken = () => {
    return localStorage.getItem("customer_token");
  };

  const fetchOrders = async () => {
    try {
      const token = getCustomerToken();

      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/api/my-orders/${token}`,
      });

      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

      <div className="space-y-5">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-lg">Order #{order.id}</h2>

                  <p className="text-sm text-gray-500">
                    Table {order.table_number}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "cooking"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "served"
                          ? "bg-green-100 text-green-700"
                          : order.status === "paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Payment :
                  <span
                    className={`font-semibold ml-1 ${
                      order.status === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                {order.transaction_details?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <h3 className="font-medium">
                        {item.product.product_name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.qty} x Rp{" "}
                        {(item.price * 1000).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <h3 className="font-semibold text-orange-500">
                      Rp {(item.subtotal * 1000).toLocaleString("id-ID")}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5">
                <h2 className="font-bold text-lg">Total</h2>

                <h2 className="font-bold text-xl text-orange-500">
                  Rp {(order.total_price * 1000).toLocaleString("id-ID")}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </div>
  );
}
