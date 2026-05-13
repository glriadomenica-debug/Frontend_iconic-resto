import ProdList from "./pages/ProductList";
import EditProd from "./pages/EditProduct";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";

const ProductRoutes = [
  {
    path: "/products",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <ProdList />,
      },
    ],
  },
  {
    path: "/products/edit/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <EditProd />,
      },
    ],
  },
];
export default ProductRoutes;
