import { useRoutes } from "react-router-dom";
import adminRoutes from "../modules/Admin/route";
import categoryRoutes from "../modules/Categories/route";

export default function AppRoutes() {
  return useRoutes([...adminRoutes, ...categoryRoutes]);
}
