import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";
import MenuPage from "./pages/MenuPage";
import MyOrderPage from "./pages/MyOrderPage";
import Staff from "./Staff/pages/StaffList";
import EditStaff from "./Staff/pages/EditStaff";
import UserList from "./Users/pages/UserList";
import EditUser from "./Users/pages/EditUser";
import LiveOrderPage from "./LiveOrder/pages/liveorderList";

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
  {
    path: "/admin/user",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <UserList />,
      },
    ],
  },
  {
    path: "/admin/user/edit/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <EditUser />,
      },
    ],
  },
  {
    path: "/liveOrder",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <LiveOrderPage />,
      },
    ],
  },
];
export default AdminRoutes;
