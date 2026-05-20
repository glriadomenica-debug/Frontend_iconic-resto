import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function TransactionReport() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filterType, setFilterType] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem("token");

  const fetchReport = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/api/transactions/report",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let trx = res.data.data || [];

      // Filter months
      if (filterType === "monthly") {
        trx = trx.filter((item: any) => {
          const month = new Date(item.created_at).getMonth() + 1;

          return month === Number(selectedMonth);
        });
      }

      setTransactions(trx);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filterType, selectedMonth]);

  const paidTransactions = transactions.filter(
    (item) => item.status === "paid",
  );

  // Total revenue
  const totalRevenue = paidTransactions.reduce(
    (sum, item) => sum + Number(item.total_price || 0),
    0,
  );

  // Payment method
  const paymentMap: Record<string, number> = {};

  paidTransactions.forEach((item) => {
    const method = item.payment_method;
    paymentMap[method] = (paymentMap[method] || 0) + 1;
  });

  // Most used payment method
  const mostUsedPayment = Object.entries(paymentMap).sort(
    (a, b) => b[1] - a[1],
  )[0];

  // Product sold
  const productMap: Record<string, number> = {};

  paidTransactions.forEach((trx) => {
    trx.transaction_details?.forEach((detail: any) => {
      const productName = detail.product?.product_name;

      if (!productName) return;

      productMap[productName] = (productMap[productName] || 0) + detail.qty;
    });
  });

  // Best seller menu
  const bestSeller = Object.entries(productMap).sort((a, b) => b[1] - a[1])[0];

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 20);
    doc.setFontSize(12);
    const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString(
      "en-US",
      {
        month: "long",
      },
    );
    doc.text(`Period: ${monthName} ${selectedYear}`, 14, 30);
    doc.text(
      `Total Revenue: Rp. ${(totalRevenue * 1000).toLocaleString("id-ID")}`,
      14,
      40,
    );
    doc.text(`Most Used Payment: ${mostUsedPayment?.[0] || "-"}`, 14, 50);
    doc.text(`Best Seller Product: ${bestSeller?.[0] || "-"}`, 14, 60);
    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty Sold"]],
      body: Object.entries(productMap).map(([product, qty]) => [
        product,
        String(qty),
      ]),
    });
    doc.save("transaction-report.pdf");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transaction Report</h1>

        <div className="flex gap-3">
          <button
            onClick={downloadReport}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download Report
          </button>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="monthly">Monthly</option>

            <option value="weekly">Weekly</option>
          </select>

          {filterType === "monthly" && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="border rounded-lg px-4 py-2"
            >
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          )}
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-orange-100 p-5 rounded-2xl">
          <h2 className="text-sm text-gray-600">Total Revenue</h2>

          <p className="text-2xl font-bold mt-2">
            Rp. {(totalRevenue * 1000).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-blue-100 p-5 rounded-2xl">
          <h2 className="text-sm text-gray-600">Most Used Payment</h2>

          <p className="text-2xl font-bold mt-2 capitalize">
            {mostUsedPayment?.[0] || "-"}
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded-2xl">
          <h2 className="text-sm text-gray-600">Best Seller Product</h2>

          <p className="text-2xl font-bold mt-2">{bestSeller?.[0] || "-"}</p>
        </div>
      </div>

      {/* Product Sold Table */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Product Sold</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">No</th>
                <th className="text-left px-4 py-3">Product Name</th>
                <th className="text-left px-4 py-3 rounded-r-xl">Total Sold</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(productMap).length > 0 ? (
                Object.entries(productMap)
                  .sort((a, b) => Number(b[1]) - Number(a[1]))
                  .map(([product, qty], index) => (
                    <tr
                      key={product}
                      className="border-b border-gray-100 hover:bg-orange-50 transition"
                    >
                      <td className="px-4 py-4">{index + 1}</td>

                      <td className="px-4 py-4 font-medium text-gray-700">
                        {product}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {String(qty)} sold
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No product sales data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
