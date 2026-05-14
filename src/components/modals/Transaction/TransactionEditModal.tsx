interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  data: any;
  setData: (val: any) => void;
  onSave: () => void;
}

export default function TransactionEditModal({
  open,
  setOpen,
  data,
  setData,
  onSave,
}: Props) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded">
        <h1 className="text-xl font-bold mb-3">Edit Transaction #{data.id}</h1>

        <label>Customer Name</label>
        <input
          className="border w-full p-2 mb-3"
          value={data.customer_name}
          onChange={(e) => setData({ ...data, customer_name: e.target.value })}
        />

        <label>Status</label>
        <select
          className="border w-full p-2 mb-3"
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={onSave}
          className="bg-green-500 text-white w-full py-2"
        >
          Save
        </button>

        <button
          onClick={() => setOpen(false)}
          className="bg-gray-500 text-white w-full py-2 mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
