import Menu from "./pages/menu";
import LayoutCust from "../../../components/layouts/LayoutCustomer/layoutCust";
const LoginRoutes = [
  {
    path: "/",
    element: <LayoutCust />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
    ],
  },
];
export default LoginRoutes;
