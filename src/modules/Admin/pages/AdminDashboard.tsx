import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
interface TransactionDetail {
  product: {
    product_name: string;
  };
  qty: number;
}
interface Transaction {
  id: number;
  total_price: number;
  created_at: string;
  transaction_details?: TransactionDetail[];
}

interface ProductChart {
  name: string;
  total: number;
}

interface RevenueChart {
  date: string;
  revenue: number;
}

export default function DashboardAnalytics() {
  const [_transactions, setTransactions] = useState<Transaction[]>([]);
  const [topProducts, setTopProducts] = useState<ProductChart[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueChart[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");

  const fetchAnalytics = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:8000/api/transactions",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("FULL RESPONSE :", res.data);

      const fetchedTransactions =
        res.data?.data?.data || res.data?.data || res.data || [];
      console.log(fetchedTransactions[0]);

      console.log("TRANSACTIONS :", fetchedTransactions);

      setTransactions(fetchedTransactions);

      const revenue = fetchedTransactions.reduce(
        (sum: number, item: Transaction) => sum + Number(item.total_price || 0),
        0,
      );

      setTotalRevenue(revenue);

      setTotalTransactions(fetchedTransactions.length);

      const productMap: Record<string, number> = {};

      fetchedTransactions.forEach((trx: Transaction) => {
        trx.transaction_details?.forEach((detail) => {
          const productName = detail.product?.product_name;

          if (!productName) return;

          if (productMap[productName]) {
            productMap[productName] += Number(detail.qty || 0);
          } else {
            productMap[productName] = Number(detail.qty || 0);
          }
        });
      });
      const formattedProducts = Object.keys(productMap)
        .map((key) => ({
          name: key,
          total: productMap[key],
        }))
        .sort((a, b) => b.total - a.total) // urut dari terbesar
        .slice(0, 5); // ambil top 5

      setTopProducts(formattedProducts);

      const revenueMap: Record<string, number> = {};

      fetchedTransactions.forEach((trx: Transaction) => {
        const date = new Date(trx.created_at).toLocaleDateString("id-ID");
        if (revenueMap[date]) {
          revenueMap[date] += Number(trx.total_price || 0);
        } else {
          revenueMap[date] = Number(trx.total_price || 0);
        }
      });

      const formattedRevenue = Object.keys(revenueMap).map((date) => ({
        date,
        revenue: revenueMap[date],
      }));

      console.log("REVENUE DATA :", formattedRevenue);

      setRevenueData(formattedRevenue);
    } catch (error) {
      console.log("ERROR FETCH ANALYTICS :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        {/* <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1> */}

        <p className="text-gray-500 mt-1">Restaurant sales analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-sm text-gray-500">Total Revenue</h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            Rp. {(totalRevenue * 1000).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-sm text-gray-500">Total Transactions</h2>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            {totalTransactions}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Most Ordered Products</h2>

          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="total" fill="#f97316" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] flex items-center justify-center text-gray-400">
              No product analytics found
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Revenue Analytics</h2>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[320px] flex items-center justify-center text-gray-400">
              No revenue analytics found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
