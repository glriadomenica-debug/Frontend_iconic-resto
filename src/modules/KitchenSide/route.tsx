import LayoutKitchen from "../../components/layouts/LayoutKitchen/layoutKitchen";
import LiveOrderKitchen from "./pages/liveOrder";
import ProtectedRoute from "../../components/ProtectedRoute";

const KitchenRoute = [
  {
    path: "/kitchen/live-order",
    element: (
      <ProtectedRoute allowedRoles={["dapur"]}>
        <LayoutKitchen />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <LiveOrderKitchen /> }],
  },
];
export default KitchenRoute;
