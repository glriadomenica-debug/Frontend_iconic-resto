import CatList from "./pages/CategoryList";
import EditCat from "./pages/EditCategory";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";

const CategoryRoutes = [
  {
    path: "/categories",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <CatList />,
      },
    ],
  },
  {
    path: "/categories/edit/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <EditCat />,
      },
    ],
  },
];
export default CategoryRoutes;
