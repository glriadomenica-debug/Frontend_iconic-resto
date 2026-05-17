interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  data: any;
}

export default function TransactionDetailModal({ open, setOpen, data }: Props) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[450px] p-6 rounded">
        <h1 className="text-xl font-bold mb-2">Transaction #{data.id}</h1>

        <p>Customer Name: {data.customer_name}</p>
        <p>Table Number: {data.table_number}</p>
        <p>Status: {data.status}</p>
        <p>Total: Rp {data.total_price.toLocaleString("id-ID")}</p>

        <hr className="my-3" />

        {data.transaction_details.map((item: any) => (
          <div key={item.id} className="border-b py-2">
            <p className="font-bold">{item.product.product_name}</p>
            <p>
              {item.qty} x Rp {item.price}
            </p>
            <p>Subtotal: Rp {item.subtotal}</p>
          </div>
        ))}

        <button
          onClick={() => setOpen(false)}
          className="mt-3 bg-red-500 text-white w-full py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
