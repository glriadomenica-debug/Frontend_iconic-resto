import Menu from "./pages/menu";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin/layoutAdmin";

const MenuRoutes = [
  {
    path: "/menu",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
    ],
  },
];
export default MenuRoutes;
