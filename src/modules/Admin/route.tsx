import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";
import MenuPage from "./pages/MenuPage";
import MyOrderPage from "./pages/MyOrderPage";
import Staff from "./Staff/pages/StaffList";
import EditStaff from "./Staff/pages/EditStaff";

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
  {
    path: "/staff",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Staff />,
      },
    ],
  },
  {
    path: "/staff/edit/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <EditStaff />,
      },
    ],
  },
];
export default AdminRoutes;
