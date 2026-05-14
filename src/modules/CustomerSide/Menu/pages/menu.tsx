import { useEffect, useState } from "react";
import axios from "axios";
import MenuDetailModal from "../../../../components/modals/CustomerSide/Menu/MenuDetailModal";

interface Product {
  id: number;
  product_name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  qty: number;
}

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products").then((res) => {
      setProducts(res.data.data.data);
    });
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);

      if (exist) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id: number, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter((i) => i.id !== id));
      return;
    }

    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const checkout = async () => {
    try {
      const payload = {
        user_id: 1,
        payment_method: paymentMethod,
        items: cart.map((i) => ({
          product_id: i.id,
          qty: i.qty,
        })),
      };

      const res = await axios.post(
        "http://localhost:8000/api/transactions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setCart([]);

      const id = res.data.data.id;

      const detail = await axios.get(
        `http://localhost:8000/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setSelectedTransaction(detail.data.data);
      setOpenDetail(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* PRODUCTS */}
      <div className="w-2/3">
        <h1 className="font-bold text-xl mb-4">Transaction</h1>

        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded">
              <h2 className="font-bold">{p.product_name}</h2>
              <p>Rp {(p.price * 1000).toLocaleString("id-ID")}</p>

              <button
                onClick={() => addToCart(p)}
                className="bg-green-500 text-white px-3 py-1 mt-2"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="w-1/3 border p-4 rounded">
        <h1 className="font-bold">Cart</h1>

        {cart.map((i) => (
          <div key={i.id}>
            <p>{i.product_name}</p>

            <div>
              <button onClick={() => changeQty(i.id, i.qty - 1)}>-</button>

              <span>{i.qty}</span>

              <button onClick={() => changeQty(i.id, i.qty + 1)}>+</button>
            </div>
          </div>
        ))}

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border w-full mt-3"
        >
          <option value="cash">Cash</option>
          <option value="qris">QRIS</option>
          <option value="card">Card</option>
        </select>

        <h2 className="font-bold mt-3">
          Total: Rp {total.toLocaleString("id-ID")}
        </h2>

        <button
          onClick={checkout}
          className="bg-blue-500 text-white w-full py-2 mt-2"
        >
          Checkout
        </button>
      </div>

      {/* DETAIL MODAL */}
      <MenuDetailModal
        open={openDetail}
        setOpen={setOpenDetail}
        data={selectedTransaction}
      />
    </div>
  );
}
