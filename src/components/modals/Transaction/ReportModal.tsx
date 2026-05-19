interface ReportModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reportData: any;
}

export default function ReportModal({
  open,
  setOpen,
  reportData,
}: ReportModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sales Report</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>

          <p className="text-3xl font-bold text-green-600">
            Rp. {(reportData?.totalRevenue * 1000).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>

          <div className="space-y-2">
            {Object.entries(reportData?.paymentMap || {}).map(
              ([method, total]: any) => (
                <div
                  key={method}
                  className="flex justify-between bg-gray-100 rounded-lg px-4 py-3"
                >
                  <span className="capitalize">{method}</span>
                  <span>{String(total)} transactions</span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Daily Revenue</h3>

          <div className="space-y-2">
            {Object.entries(reportData?.dailyRevenue || {}).map(
              ([date, revenue]: any) => (
                <div
                  key={date}
                  className="flex justify-between bg-gray-100 rounded-lg px-4 py-3"
                >
                  <span>{String(date)}</span>
                  <span>
                    Rp. {(Number(revenue) * 1000).toLocaleString("id-ID")}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Products Sold</h3>
          <div className="space-y-2">
            {Object.entries(reportData?.productMap || {}).map(
              ([product, qty]: any) => (
                <div
                  key={product}
                  className="flex justify-between bg-gray-100 rounded-lg px-4 py-3"
                >
                  <span>{String(product)}</span>
                  <span>{String(qty)} sold</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
