import PayVerif from "./pages/PayConfirm";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin/layoutAdmin";

const PayConfirmRoute = [
  {
    path: "/cashier/payment-verification",
    element: <LayoutAdmin />,
    children: [{ index: true, element: <PayVerif /> }],
  },
];
export default PayConfirmRoute;
