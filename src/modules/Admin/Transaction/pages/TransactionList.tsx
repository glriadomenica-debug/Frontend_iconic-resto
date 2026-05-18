import { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import TransactionDetailModal from "../../../../components/modals/Transaction/TransactionDetailModal";
import TransactionEditModal from "../../../../components/modals/Transaction/TransactionEditModal";

interface Transaction {
  id: number;
  customer_name: string;
  table_number: number;
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchTransactions = async (pageNumber = 1) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/api/transactions?page=${pageNumber}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // setTransactions(res.data.data || []);
      setTransactions(res.data.data.data);
      setPage(res.data.data.current_page);
      setLastPage(res.data.data.last_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const openDetail = async (id: number) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/api/transactions/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelected(res.data.data);
      setIsDetailOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditModal = (transaction: Transaction) => {
    setEditData(transaction);
    setOpenEdit(true);
  };

  const deleteTransaction = async (id: number) => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/transactions/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const updatePaid = async (id: number) => {
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:8000/api/transactions/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: "paid",
        },
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/transactions/${editData.id}`,
        { customer_name: editData.customer_name, status: editData.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editData.id
            ? {
                ...t,
                customer_name: editData.customer_name,
                status: editData.status,
              }
            : t,
        ),
      );

      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction List
            </h1>
            <p className="text-sm text-gray-500">
              Manage restaurant transactions
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">No</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Table Number</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Payment</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-center px-4 py-3 rounded-r-xl">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((t, index) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-100 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {t.customer_name || "-"}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700 capitalize">
                      {t.table_number}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      Rp. {(t.total_price * 1000).toLocaleString("id-ID")}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700 capitalize">
                      {t.payment_method}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          t.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : t.status === "cooking"
                              ? "bg-blue-100 text-blue-700"
                              : t.status === "served"
                                ? "bg-purple-100 text-purple-700"
                                : t.status === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {new Date(t.created_at).toLocaleDateString("id-ID")}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openDetail(t.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                        >
                          Detail
                        </button>

                        <button
                          onClick={() => updatePaid(t.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                        >
                          Paid
                        </button>

                        <button
                          onClick={() => openEditModal(t)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                        >
                          <AiTwotoneEdit />
                        </button>

                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No transaction found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              page === lastPage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODALS */}
      <TransactionDetailModal
        open={isDetailOpen}
        setOpen={setIsDetailOpen}
        data={selected}
      />

      <TransactionEditModal
        open={openEdit}
        setOpen={setOpenEdit}
        data={editData}
        setData={setEditData}
        onSave={handleUpdateStatus}
      />
    </>
  );
}
