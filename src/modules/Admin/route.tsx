import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";
import MenuPage from "./pages/MenuPage";
import MyOrderPage from "./pages/MyOrderPage";

const AdminRoutes = [
  {
    path: "/dashboard",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
  {
    path: "/admin/menu",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
    ],
  },
  {
    path: "/admin/orders",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <MyOrderPage />,
      },
    ],
  },
];
export default AdminRoutes;
