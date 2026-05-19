import { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  id: number;
  customer_name: string;
  table_number: string;
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function PaymentVerificationPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchTransactions = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/api/transactions",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // tampilkan semua transaksi selain cancelled
      const filtered = res.data.data.data.filter(
        (item: Transaction) => item.status !== "cancelled",
      );

      setTransactions(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((item) => {
    if (filterStatus === "paid") {
      return item.status === "paid";
    }

    if (filterStatus === "unpaid") {
      return item.status !== "paid";
    }

    return item.status !== "cancelled";
  });

  const verifyPayment = async (id: number, paymentMethod: string) => {
    try {
      await axios({
        method: "POST",
        url: `http://localhost:8000/api/payment-verifications/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          payment_method: paymentMethod,
          verified_by: user.id,
          created_by: user.id,
          updated_by: user.id,
        },
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Filter Payment*/}
      <div className="mb-6 flex justify-end items-center gap-3">
        <label className="text-sm font-medium text-gray-700">
          Filter Payment
        </label>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="all">All</option>

          <option value="paid">Already Paid</option>

          <option value="unpaid">Not Paid Yet</option>
        </select>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Verification
        </h1>

        <p className="text-gray-500">Verify customer payments</p>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 gap-5">
        {transactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-md p-5">
              {/* CUSTOMER */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {t.customer_name}
                </h2>

                <p className="text-gray-500">Table {t.table_number}</p>
              </div>

              {/* INFO */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total</span>

                  <span className="font-semibold text-orange-500">
                    Rp. {(t.total_price * 1000).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment Type</span>

                  <span className="capitalize">{t.payment_method}</span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>

                  <span
                    className={`font-semibold capitalize ${
                      t.status === "paid"
                        ? "text-green-600"
                        : t.status === "ready"
                          ? "text-blue-600"
                          : t.status === "cooking"
                            ? "text-orange-600"
                            : "text-yellow-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Date</span>

                  <span>
                    {new Date(t.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              {t.status !== "paid" ? (
                <button
                  onClick={() => verifyPayment(t.id, t.payment_method)}
                  className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition"
                >
                  Verify Payment
                </button>
              ) : (
                <button
                  disabled
                  className="w-full mt-5 bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                >
                  Already Paid
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl shadow-md p-10 text-center text-gray-500">
            No transaction found
          </div>
        )}
      </div>
    </div>
  );
}
