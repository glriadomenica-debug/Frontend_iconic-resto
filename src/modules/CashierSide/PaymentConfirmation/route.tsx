import PayVerif from "./pages/PayConfirm";
import LayoutCashier from "../../../components/layouts/LayoutCashier/layoutCashier";
import Menu from "./pages/MenuPage";
import OrderPage from "./pages/MyOrderPage";
import ProtectedRoute from "../../../components/ProtectedRoute";

const CashierRoute = [
  {
    path: "/cashier/payment-verification",
    element: (
      <ProtectedRoute allowedRoles={["kasir"]}>
        <LayoutCashier />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <PayVerif /> }],
  },
  {
    path: "/cashier/menu",
    element: (
      <ProtectedRoute allowedRoles={["kasir"]}>
        <LayoutCashier />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Menu /> }],
  },
  {
    path: "cashier/orders",
    element: (
      <ProtectedRoute allowedRoles={["kasir"]}>
        <LayoutCashier />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <OrderPage /> }],
  },
];
export default CashierRoute;
