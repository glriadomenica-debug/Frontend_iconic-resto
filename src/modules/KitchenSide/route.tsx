import LayoutKitchen from "../../components/layouts/LayoutKitchen/layoutKitchen";
import LiveOrderKitchen from "./pages/liveOrder";

const KitchenRoute = [
  {
    path: "/kitchen/live-order",
    element: <LayoutKitchen />,
    children: [{ index: true, element: <LiveOrderKitchen /> }],
  },
];
export default KitchenRoute;
