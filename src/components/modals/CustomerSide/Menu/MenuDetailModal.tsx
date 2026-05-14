export default function MenuDetailModal({ open, setOpen, data }: any) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] rounded">
        <h2 className="font-bold text-xl">Transaction #{data.id}</h2>

        <p>Status: {data.status}</p>
        <p>Total: Rp {(data.total_price * 1000).toLocaleString("id-ID")}</p>
        <hr className="my-3" />

        {data.transaction_details?.map((i: any) => (
          <div key={i.id}>
            <p className="font-bold">{i.product.product_name}</p>
            <p>
              {i.qty} x Rp {(i.price * 1000).toLocaleString("id-ID")}
            </p>

            <p>Subtotal: Rp {(i.subtotal * 1000).toLocaleString("id-ID")}</p>
          </div>
        ))}

        <button
          onClick={() => setOpen(false)}
          className="bg-red-500 text-white w-full mt-3"
        >
          Close
        </button>
      </div>
    </div>
  );
}
