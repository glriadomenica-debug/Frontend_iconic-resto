import Menu from "./pages/menu";
import Myorder from "./pages/myorder";
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
  {
    path: "/myorders",
    element: <LayoutCust />,
    children: [
      {
        index: true,
        element: <Myorder />,
      },
    ],
  },
];
export default LoginRoutes;
