import PayVerif from "./pages/PayConfirm";
import LayoutCashier from "../../../components/layouts/LayoutCashier/layoutCashier";
import Menu from "./pages/MenuPage";
import OrderPage from "./pages/MyOrderPage";

const PayConfirmRoute = [
  {
    path: "/cashier/payment-verification",
    element: <LayoutCashier />,
    children: [{ index: true, element: <PayVerif /> }],
  },
  {
    path: "/cashier/menu",
    element: <LayoutCashier />,
    children: [{ index: true, element: <Menu /> }],
  },
  {
    path: "cashier/orders",
    element: <LayoutCashier />,
    children: [{ index: true, element: <OrderPage /> }],
  },
];
export default PayConfirmRoute;
