import Admin from "./pages/AdminDashboard";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";

const AdminRoutes = [
  {
    path: "/dashboard",
    element :<LayoutAdmin/>,
    children : [
      {
        index: true, element : <Admin/>
      },
    ],
  },
];
export default AdminRoutes;