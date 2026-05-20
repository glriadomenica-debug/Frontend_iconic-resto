import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";
import MenuPage from "./pages/MenuPage";
import MyOrderPage from "./pages/MyOrderPage";
import Staff from "./Staff/pages/StaffList";
import EditStaff from "./Staff/pages/EditStaff";
import UserList from "./Users/pages/UserList";
import EditUser from "./Users/pages/EditUser";
import LiveOrderPage from "./LiveOrder/pages/liveorderList";
import PayVerif from "./PaymentVerification/pages/PayVerif";
import TransactionList from "./Transaction/pages/TransactionList";
import CatList from "./Categories/pages/CategoryList";
import EditCat from "./Categories/pages/EditCategory";
import ProdList from "./Products/pages/ProductList";
import EditProd from "./Products/pages/EditProduct";
import ProtectedRoute from "../../components/ProtectedRoute";
import TransactionReport from "./Transaction/pages/TransactionReport";

const AdminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
    ],
  },
  {
    path: "/admin/menu",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
    ],
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MyOrderPage />,
      },
    ],
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MyOrderPage />,
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Staff />,
      },
    ],
  },
  {
    path: "/staff/edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EditStaff />,
      },
    ],
  },
  {
    path: "/admin/user",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserList />,
      },
    ],
  },
  {
    path: "/admin/user/edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EditUser />,
      },
    ],
  },
  {
    path: "/admin/liveOrder",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <LiveOrderPage />,
      },
    ],
  },
  {
    path: "/admin/payment-verification",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PayVerif />,
      },
    ],
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransactionList />,
      },
    ],
  },
  {
    path: "/transactions/report",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TransactionReport />,
      },
    ],
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <CatList />,
      },
    ],
  },
  {
    path: "/categories/edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EditCat />,
      },
    ],
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProdList />,
      },
    ],
  },
  {
    path: "/products/edit/:id",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />,
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EditProd />,
      },
    ],
  },
];
export default AdminRoutes;
