import { useRoutes } from "react-router-dom";
import adminRoutes from "../modules/Admin/route";

export default function AppRoutes() {
  return useRoutes([...adminRoutes]);
}