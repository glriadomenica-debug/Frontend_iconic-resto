import PayConfirm from "./pages/PayConfirm";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin/layoutAdmin";

const PayConfirmRoute = [
  {
    path: "/payment-verification",
    element: <LayoutAdmin />,
    children: [{ index: true, element: <PayConfirm /> }],
  },
];
export default PayConfirmRoute;
