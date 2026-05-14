import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";
import MenuPage from "./pages/MenuPage";

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
];
export default AdminRoutes;
